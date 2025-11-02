'use client';

import { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { messageApi } from '@/lib/api/message';
import { useAuth } from '@/hooks/useAuth';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function MessagesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(
    searchParams.get('userId')
  );
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const { data: conversations, isLoading: loadingConversations } = useQuery({
    queryKey: ['conversations'],
    queryFn: messageApi.getConversations,
    enabled: isAuthenticated,
  });

  const { data: messages, isLoading: loadingMessages } = useQuery({
    queryKey: ['messages', selectedUserId],
    queryFn: () => messageApi.getConversation(selectedUserId!),
    enabled: isAuthenticated && !!selectedUserId,
  });

  const sendMessageMutation = useMutation({
    mutationFn: messageApi.sendMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', selectedUserId] });
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      setMessageText('');
    },
  });

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageText.trim() && selectedUserId) {
      sendMessageMutation.mutate({
        receiverId: selectedUserId,
        content: messageText.trim(),
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/dashboard">
            <h1 className="text-2xl font-bold text-pink-600">💍 Matrimony</h1>
          </Link>
          <Link href="/dashboard" className="text-gray-600 hover:text-pink-600">
            ← Back to Dashboard
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
            <p className="text-gray-600">Chat with your connections</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden" style={{ height: 'calc(100vh - 250px)' }}>
            <div className="grid grid-cols-12 h-full">
              {/* Conversations List */}
              <div className="col-span-12 md:col-span-4 border-r overflow-y-auto">
                <div className="p-4 border-b bg-gray-50">
                  <h2 className="font-semibold text-gray-900">Conversations</h2>
                </div>

                {loadingConversations ? (
                  <div className="p-8 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600 mx-auto"></div>
                  </div>
                ) : conversations && conversations.length > 0 ? (
                  <div className="divide-y">
                    {conversations.map((conversation) => (
                      <button
                        key={conversation.otherUserId}
                        onClick={() => setSelectedUserId(conversation.otherUserId)}
                        className={`w-full p-4 text-left hover:bg-gray-50 transition ${
                          selectedUserId === conversation.otherUserId ? 'bg-pink-50' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center text-xl flex-shrink-0">
                            👤
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-1">
                              <h3 className="font-semibold text-gray-900 truncate">
                                {conversation.otherUserName}
                              </h3>
                              <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                                {formatDate(conversation.lastMessageTime)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 truncate">
                              {conversation.lastMessage}
                            </p>
                            {conversation.unreadCount > 0 && (
                              <span className="inline-block mt-1 px-2 py-0.5 bg-pink-600 text-white text-xs rounded-full">
                                {conversation.unreadCount} new
                              </span>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <div className="text-4xl mb-3">💬</div>
                    <p className="text-gray-600 mb-4">No conversations yet</p>
                    <Link
                      href="/interests"
                      className="inline-block px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition text-sm"
                    >
                      View Interests
                    </Link>
                  </div>
                )}
              </div>

              {/* Messages Area */}
              <div className="col-span-12 md:col-span-8 flex flex-col">
                {selectedUserId ? (
                  <>
                    {/* Messages Header */}
                    <div className="p-4 border-b bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center text-lg">
                          👤
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {conversations?.find(c => c.otherUserId === selectedUserId)?.otherUserName}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Messages List */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {loadingMessages ? (
                        <div className="flex items-center justify-center h-full">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
                        </div>
                      ) : messages && messages.length > 0 ? (
                        <>
                          {messages.map((message) => {
                            const isOwnMessage = message.senderId !== selectedUserId;
                            return (
                              <div
                                key={message.id}
                                className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                              >
                                <div
                                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                    isOwnMessage
                                      ? 'bg-pink-600 text-white'
                                      : 'bg-gray-100 text-gray-900'
                                  }`}
                                >
                                  <p className="text-sm">{message.content}</p>
                                  <p
                                    className={`text-xs mt-1 ${
                                      isOwnMessage ? 'text-pink-100' : 'text-gray-500'
                                    }`}
                                  >
                                    {formatDate(message.sentAt)}
                                    {isOwnMessage && message.isRead && ' • Read'}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                          <div ref={messagesEndRef} />
                        </>
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <div className="text-center">
                            <div className="text-4xl mb-3">💬</div>
                            <p className="text-gray-600">Start a conversation</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Message Input */}
                    <div className="p-4 border-t bg-gray-50">
                      <form onSubmit={handleSendMessage} className="flex gap-3">
                        <input
                          type="text"
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          placeholder="Type your message..."
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
                        />
                        <button
                          type="submit"
                          disabled={!messageText.trim() || sendMessageMutation.isPending}
                          className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Send
                        </button>
                      </form>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">💬</div>
                      <p className="text-gray-600 text-lg">Select a conversation to start messaging</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { interestApi } from '@/lib/api/interest';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function InterestsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<'received' | 'sent'>('received');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const { data: receivedInterests, isLoading: loadingReceived } = useQuery({
    queryKey: ['interests', 'received'],
    queryFn: interestApi.getReceivedInterests,
    enabled: isAuthenticated,
  });

  const { data: sentInterests, isLoading: loadingSent } = useQuery({
    queryKey: ['interests', 'sent'],
    queryFn: interestApi.getSentInterests,
    enabled: isAuthenticated,
  });

  const respondMutation = useMutation({
    mutationFn: ({ interestId, status }: { interestId: string; status: number }) =>
      interestApi.respondToInterest({ interestId, status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interests'] });
    },
  });

  const cancelMutation = useMutation({
    mutationFn: interestApi.cancelInterest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interests'] });
    },
  });

  const getStatusBadge = (status: number) => {
    const statusMap: Record<number, { label: string; className: string }> = {
      0: { label: 'Pending', className: 'bg-yellow-100 text-yellow-800' },
      1: { label: 'Accepted', className: 'bg-green-100 text-green-800' },
      2: { label: 'Rejected', className: 'bg-red-100 text-red-800' },
      3: { label: 'Cancelled', className: 'bg-gray-100 text-gray-800' },
    };
    const statusInfo = statusMap[status] || statusMap[0];
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.className}`}>
        {statusInfo.label}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Interests</h1>
            <p className="text-gray-600">Manage your sent and received interest requests</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setActiveTab('received')}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === 'received'
                  ? 'bg-pink-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              ❤️ Received ({receivedInterests?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab('sent')}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === 'sent'
                  ? 'bg-pink-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              📤 Sent ({sentInterests?.length || 0})
            </button>
          </div>

          {/* Received Interests */}
          {activeTab === 'received' && (
            <div className="space-y-4">
              {loadingReceived ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-pink-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading interests...</p>
                </div>
              ) : receivedInterests && receivedInterests.length > 0 ? (
                receivedInterests.map((interest) => (
                  <div key={interest.id} className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Link 
                            href={`/profile/${interest.senderId}`}
                            className="text-xl font-semibold text-gray-900 hover:text-pink-600"
                          >
                            {interest.senderName}
                          </Link>
                          {getStatusBadge(interest.status)}
                        </div>
                        <p className="text-gray-600 text-sm mb-3">
                          Sent on {formatDate(interest.sentAt)}
                        </p>
                        {interest.message && (
                          <div className="bg-gray-50 rounded-lg p-4 mb-4">
                            <p className="text-gray-700">{interest.message}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {interest.status === 0 && (
                      <div className="flex gap-3">
                        <button
                          onClick={() => respondMutation.mutate({ interestId: interest.id, status: 1 })}
                          disabled={respondMutation.isPending}
                          className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                        >
                          ✓ Accept
                        </button>
                        <button
                          onClick={() => respondMutation.mutate({ interestId: interest.id, status: 2 })}
                          disabled={respondMutation.isPending}
                          className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                        >
                          ✗ Reject
                        </button>
                        <Link
                          href={`/profile/${interest.senderId}`}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-center"
                        >
                          View Profile
                        </Link>
                      </div>
                    )}

                    {interest.status === 1 && (
                      <div className="flex gap-3">
                        <Link
                          href={`/messages?userId=${interest.senderId}`}
                          className="flex-1 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition text-center"
                        >
                          💬 Send Message
                        </Link>
                        <Link
                          href={`/profile/${interest.senderId}`}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-center"
                        >
                          View Profile
                        </Link>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-xl">
                  <div className="text-6xl mb-4">💔</div>
                  <p className="text-gray-600 text-lg">No received interests yet</p>
                </div>
              )}
            </div>
          )}

          {/* Sent Interests */}
          {activeTab === 'sent' && (
            <div className="space-y-4">
              {loadingSent ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-pink-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading interests...</p>
                </div>
              ) : sentInterests && sentInterests.length > 0 ? (
                sentInterests.map((interest) => (
                  <div key={interest.id} className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Link 
                            href={`/profile/${interest.receiverId}`}
                            className="text-xl font-semibold text-gray-900 hover:text-pink-600"
                          >
                            {interest.receiverName}
                          </Link>
                          {getStatusBadge(interest.status)}
                        </div>
                        <p className="text-gray-600 text-sm mb-3">
                          Sent on {formatDate(interest.sentAt)}
                          {interest.respondedAt && ` • Responded on ${formatDate(interest.respondedAt)}`}
                        </p>
                        {interest.message && (
                          <div className="bg-gray-50 rounded-lg p-4 mb-4">
                            <p className="text-gray-700">{interest.message}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Link
                        href={`/profile/${interest.receiverId}`}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-center"
                      >
                        View Profile
                      </Link>
                      
                      {interest.status === 0 && (
                        <button
                          onClick={() => cancelMutation.mutate(interest.id)}
                          disabled={cancelMutation.isPending}
                          className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition disabled:opacity-50"
                        >
                          Cancel Interest
                        </button>
                      )}

                      {interest.status === 1 && (
                        <Link
                          href={`/messages?userId=${interest.receiverId}`}
                          className="flex-1 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition text-center"
                        >
                          💬 Send Message
                        </Link>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-xl">
                  <div className="text-6xl mb-4">📤</div>
                  <p className="text-gray-600 text-lg mb-4">You haven't sent any interests yet</p>
                  <Link
                    href="/search"
                    className="inline-block px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
                  >
                    Browse Profiles
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}


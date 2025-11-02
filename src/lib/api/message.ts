import { apiClient } from './client';

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  receiverName: string;
  content: string;
  isRead: boolean;
  sentAt: string;
  readAt?: string;
}

export interface Conversation {
  otherUserId: string;
  otherUserName: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export interface SendMessageInput {
  receiverId: string;
  content: string;
}

export const messageApi = {
  sendMessage: async (data: SendMessageInput): Promise<Message> => {
    const response = await apiClient.post<Message>('/message', data);
    return response.data;
  },

  getConversations: async (): Promise<Conversation[]> => {
    const response = await apiClient.get<Conversation[]>('/message/conversations');
    return response.data;
  },

  getConversation: async (otherUserId: string): Promise<Message[]> => {
    const response = await apiClient.get<Message[]>(`/message/conversation/${otherUserId}`);
    return response.data;
  },

  markAsRead: async (messageId: string): Promise<void> => {
    await apiClient.put(`/message/${messageId}/read`);
  },

  getUnreadCount: async (): Promise<number> => {
    const response = await apiClient.get<{ unreadCount: number }>('/message/unread-count');
    return response.data.unreadCount;
  },
};


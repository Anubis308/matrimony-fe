import { apiClient } from './client';

export interface Interest {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  receiverName: string;
  status: number; // 0=Pending, 1=Accepted, 2=Rejected, 3=Cancelled
  message: string;
  sentAt: string;
  respondedAt?: string;
}

export interface SendInterestInput {
  receiverId: string;
  message: string;
}

export interface RespondInterestInput {
  interestId: string;
  status: number; // 1=Accepted, 2=Rejected
}

export const interestApi = {
  sendInterest: async (data: SendInterestInput): Promise<Interest> => {
    const response = await apiClient.post<Interest>('/interest', data);
    return response.data;
  },

  respondToInterest: async (data: RespondInterestInput): Promise<void> => {
    await apiClient.post('/interest/respond', data);
  },

  getSentInterests: async (): Promise<Interest[]> => {
    const response = await apiClient.get<Interest[]>('/interest/sent');
    return response.data;
  },

  getReceivedInterests: async (): Promise<Interest[]> => {
    const response = await apiClient.get<Interest[]>('/interest/received');
    return response.data;
  },

  cancelInterest: async (interestId: string): Promise<void> => {
    await apiClient.delete(`/interest/${interestId}`);
  },
};


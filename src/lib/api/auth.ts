import { apiClient } from './client';
import type { RegisterInput, LoginInput, ChangePasswordInput } from '../schemas/auth';

export interface LoginResponse {
  token: string;
  userId: string;
  email: string;
  isProfileComplete: boolean;
}

export const authApi = {
  register: async (data: RegisterInput): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/register', data);
    return response.data;
  },

  login: async (data: LoginInput): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/login', data);
    return response.data;
  },

  changePassword: async (data: ChangePasswordInput): Promise<void> => {
    await apiClient.post('/auth/change-password', data);
  },

  getCurrentUser: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },
};


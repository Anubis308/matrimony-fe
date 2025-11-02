import { apiClient } from './client';
import type { ProfileInput } from '../schemas/profile';

export interface Profile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  religion: string;
  community: string;
  motherTongue: string;
  maritalStatus: string;
  heightInCm: number;
  education: string;
  occupation: string;
  annualIncome?: number;
  country: string;
  state: string;
  city: string;
  about: string;
  familyDetails: string;
  hobbies: string;
  photos: Photo[];
  isProfileComplete: boolean;
}

export interface Photo {
  id: string;
  url: string;
  isPrimary: boolean;
  isApproved: boolean;
}

export const profileApi = {
  createProfile: async (data: ProfileInput): Promise<Profile> => {
    const response = await apiClient.post<Profile>('/profile', data);
    return response.data;
  },

  getMyProfile: async (): Promise<Profile> => {
    const response = await apiClient.get<Profile>('/profile/me');
    return response.data;
  },

  getProfile: async (id: string): Promise<Profile> => {
    const response = await apiClient.get<Profile>(`/profile/${id}`);
    return response.data;
  },

  updateProfile: async (data: Partial<ProfileInput>): Promise<Profile> => {
    const response = await apiClient.put<Profile>('/profile', data);
    return response.data;
  },

  uploadPhoto: async (url: string, isPrimary: boolean = false): Promise<Photo> => {
    const response = await apiClient.post<Photo>('/profile/photos', { url, isPrimary });
    return response.data;
  },

  deletePhoto: async (photoId: string): Promise<void> => {
    await apiClient.delete(`/profile/photos/${photoId}`);
  },

  setPrimaryPhoto: async (photoId: string): Promise<void> => {
    await apiClient.put(`/profile/photos/${photoId}/set-primary`);
  },
};


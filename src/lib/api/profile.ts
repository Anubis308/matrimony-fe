import { apiClient } from './client';
import type { ProfileInput } from '../schemas/profile';

export interface Profile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
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

// Enum mapping utilities
const genderEnumMap = { Male: 0, Female: 1, Other: 2 } as const;
const maritalStatusEnumMap = { NeverMarried: 0, Divorced: 1, Widowed: 2, AwaitingDivorce: 3 } as const;

type GenderEnum = keyof typeof genderEnumMap;
type MaritalStatusEnum = keyof typeof maritalStatusEnumMap;

// Transform form data to API format (string enums to numbers)
const transformProfileData = (data: ProfileInput) => ({
  ...data,
  gender: genderEnumMap[data.gender as GenderEnum],
  maritalStatus: maritalStatusEnumMap[data.maritalStatus as MaritalStatusEnum],
});

export const profileApi = {
  createProfile: async (data: ProfileInput): Promise<Profile> => {
    const transformedData = transformProfileData(data);
    const response = await apiClient.post<Profile>('/profile', transformedData);
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
    // Transform enum strings to numbers for partial updates
    const transformedData: Record<string, unknown> = { ...data };
    if (data.gender) {
      transformedData.gender = genderEnumMap[data.gender as GenderEnum];
    }
    if (data.maritalStatus) {
      transformedData.maritalStatus = maritalStatusEnumMap[data.maritalStatus as MaritalStatusEnum];
    }
    const response = await apiClient.put<Profile>('/profile', transformedData);
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


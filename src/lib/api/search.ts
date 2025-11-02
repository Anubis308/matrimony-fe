import { apiClient } from './client';
import type { SearchInput } from '../schemas/profile';

export interface ProfileSummary {
  id: string;
  userId: string;
  name: string;
  age: number;
  gender: string;
  religion: string;
  community: string;
  maritalStatus: string;
  heightInCm: number;
  education: string;
  occupation: string;
  city: string;
  state: string;
  country: string;
  primaryPhotoUrl?: string;
}

export interface SearchResponse {
  profiles: ProfileSummary[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

export const searchApi = {
  searchProfiles: async (filters: SearchInput): Promise<SearchResponse> => {
    const response = await apiClient.post<SearchResponse>('/search', filters);
    return response.data;
  },

  getMatches: async (pageNumber: number = 1, pageSize: number = 20): Promise<SearchResponse> => {
    const response = await apiClient.get<SearchResponse>('/search/matches', {
      params: { pageNumber, pageSize },
    });
    return response.data;
  },
};


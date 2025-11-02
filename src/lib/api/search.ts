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

// Enum mapping utilities for search
const genderEnumMap = { Male: 0, Female: 1, Other: 2 } as const;
const maritalStatusEnumMap = { NeverMarried: 0, Divorced: 1, Widowed: 2, AwaitingDivorce: 3 } as const;

type GenderEnum = keyof typeof genderEnumMap;
type MaritalStatusEnum = keyof typeof maritalStatusEnumMap;

// Transform search data to API format (string enums to numbers)
const transformSearchData = (data: SearchInput) => {
  const transformedData: Record<string, unknown> = { ...data };
  
  if (data.gender) {
    transformedData.gender = genderEnumMap[data.gender as GenderEnum];
  }
  if (data.maritalStatus) {
    transformedData.maritalStatus = maritalStatusEnumMap[data.maritalStatus as MaritalStatusEnum];
  }
  
  return transformedData;
};

export const searchApi = {
  searchProfiles: async (filters: SearchInput): Promise<SearchResponse> => {
    const transformedFilters = transformSearchData(filters);
    const response = await apiClient.post<SearchResponse>('/search', transformedFilters);
    return response.data;
  },

  getMatches: async (pageNumber: number = 1, pageSize: number = 20): Promise<SearchResponse> => {
    const response = await apiClient.get<SearchResponse>('/search/matches', {
      params: { pageNumber, pageSize },
    });
    return response.data;
  },
};


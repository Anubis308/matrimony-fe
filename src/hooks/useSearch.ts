import { useQuery } from '@tanstack/react-query';
import { searchApi } from '@/lib/api/search';
import type { SearchInput } from '@/lib/schemas/profile';
import { useState } from 'react';

export function useSearch() {
  const [filters, setFilters] = useState<SearchInput>({
    pageNumber: 1,
    pageSize: 20,
  });

  const { data, isLoading } = useQuery({
    queryKey: ['search', filters],
    queryFn: () => searchApi.searchProfiles(filters),
  });

  return {
    profiles: data?.profiles || [],
    totalCount: data?.totalCount || 0,
    totalPages: data?.totalPages || 0,
    currentPage: filters.pageNumber,
    isLoading,
    setFilters,
    filters,
  };
}

export function useMatches(pageNumber: number = 1) {
  return useQuery({
    queryKey: ['matches', pageNumber],
    queryFn: () => searchApi.getMatches(pageNumber, 20),
  });
}


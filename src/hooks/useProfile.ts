import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { profileApi } from '@/lib/api/profile';
import type { ProfileInput } from '@/lib/schemas/profile';

export function useProfile() {
  const queryClient = useQueryClient();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: profileApi.getMyProfile,
  });

  const createProfileMutation = useMutation({
    mutationFn: profileApi.createProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: profileApi.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  const uploadPhotoMutation = useMutation({
    mutationFn: ({ url, isPrimary }: { url: string; isPrimary: boolean }) =>
      profileApi.uploadPhoto(url, isPrimary),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  return {
    profile,
    isLoading,
    createProfile: createProfileMutation.mutateAsync,
    updateProfile: updateProfileMutation.mutateAsync,
    uploadPhoto: uploadPhotoMutation.mutateAsync,
    isCreating: createProfileMutation.isPending,
    isUpdating: updateProfileMutation.isPending,
  };
}

export function useProfileById(id: string) {
  return useQuery({
    queryKey: ['profile', id],
    queryFn: () => profileApi.getProfile(id),
    enabled: !!id,
  });
}


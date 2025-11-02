import { useMutation, useQuery } from '@tanstack/react-query';
import { authApi } from '@/lib/api/auth';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import type { RegisterInput, LoginInput } from '@/lib/schemas/auth';

export function useAuth() {
  const router = useRouter();
  const { setAuth, logout: logoutStore, isAuthenticated } = useAuthStore();

  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      setAuth(data.token, {
        userId: data.userId,
        email: data.email,
        isProfileComplete: data.isProfileComplete,
      });
      router.push(data.isProfileComplete ? '/dashboard' : '/profile/create');
    },
  });

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      setAuth(data.token, {
        userId: data.userId,
        email: data.email,
        isProfileComplete: data.isProfileComplete,
      });
      router.push(data.isProfileComplete ? '/dashboard' : '/profile/create');
    },
  });

  const logout = () => {
    logoutStore();
    router.push('/');
  };

  return {
    register: registerMutation.mutateAsync,
    login: loginMutation.mutateAsync,
    logout,
    isLoading: registerMutation.isPending || loginMutation.isPending,
    isAuthenticated,
  };
}


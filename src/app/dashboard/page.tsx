'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { profileApi } from '@/lib/api/profile';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', 'me'],
    queryFn: profileApi.getMyProfile,
    enabled: isAuthenticated,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-pink-600">💍 Matrimony</h1>
          <div className="flex items-center gap-4">
            <Link
              href="/search"
              className="px-4 py-2 text-gray-700 hover:text-pink-600 transition"
            >
              🔍 Search
            </Link>
            <Link
              href="/interests"
              className="px-4 py-2 text-gray-700 hover:text-pink-600 transition"
            >
              ❤️ Interests
            </Link>
            <Link
              href="/messages"
              className="px-4 py-2 text-gray-700 hover:text-pink-600 transition"
            >
              💬 Messages
            </Link>
            <Link
              href="/profile/edit"
              className="px-4 py-2 text-gray-700 hover:text-pink-600 transition"
            >
              👤 Profile
            </Link>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome back, {profile?.firstName || 'User'}!
            </h1>
            <p className="text-gray-600">Find your perfect life partner</p>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your Profile</h2>
                <p className="text-gray-600">Keep your profile updated to get better matches</p>
              </div>
              <Link
                href="/profile/edit"
                className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
              >
                Edit Profile
              </Link>
            </div>

            {profile ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-600 text-sm">Name:</span>
                    <p className="font-semibold">{profile.firstName} {profile.lastName}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Age:</span>
                    <p className="font-semibold">{profile.age} years</p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Location:</span>
                    <p className="font-semibold">{profile.city}, {profile.state}, {profile.country}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Religion:</span>
                    <p className="font-semibold">{profile.religion} - {profile.community}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-600 text-sm">Education:</span>
                    <p className="font-semibold">{profile.education}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Occupation:</span>
                    <p className="font-semibold">{profile.occupation}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Height:</span>
                    <p className="font-semibold">{profile.heightInCm} cm</p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Marital Status:</span>
                    <p className="font-semibold">{profile.maritalStatus}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">You haven't created your profile yet</p>
                <Link
                  href="/profile/create"
                  className="inline-block px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
                >
                  Create Profile Now
                </Link>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/search" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">Search Profiles</h3>
              <p className="text-gray-600">Find matches based on your preferences</p>
            </Link>

            <Link href="/interests" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
              <div className="text-4xl mb-4">❤️</div>
              <h3 className="text-xl font-semibold mb-2">Interests</h3>
              <p className="text-gray-600">View sent and received interest requests</p>
            </Link>

            <Link href="/messages" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-semibold mb-2">Messages</h3>
              <p className="text-gray-600">Chat with your connections</p>
            </Link>
          </div>

          {/* Profile Completion */}
          {profile && !profile.isProfileComplete && (
            <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="text-3xl">⚠️</div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-yellow-900 mb-2">
                    Complete Your Profile
                  </h3>
                  <p className="text-yellow-800 mb-4">
                    Add more details to your profile to increase your chances of finding the perfect match
                  </p>
                  <Link
                    href="/profile/edit"
                    className="inline-block px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
                  >
                    Complete Profile
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}


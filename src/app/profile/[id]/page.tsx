'use client';

import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { profileApi } from '@/lib/api/profile';
import { interestApi } from '@/lib/api/interest';
import { useAuth } from '@/hooks/useAuth';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function ProfileViewPage() {
  const router = useRouter();
  const params = useParams();
  const { isAuthenticated } = useAuth();
  const profileId = params.id as string;
  const [showInterestModal, setShowInterestModal] = useState(false);
  const [interestMessage, setInterestMessage] = useState('');
  const [interestSent, setInterestSent] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', profileId],
    queryFn: () => profileApi.getProfile(profileId),
    enabled: isAuthenticated && !!profileId,
  });

  const sendInterestMutation = useMutation({
    mutationFn: (message: string) =>
      interestApi.sendInterest({ receiverId: profile!.userId, message }),
    onSuccess: () => {
      setInterestSent(true);
      setTimeout(() => {
        setShowInterestModal(false);
        setInterestMessage('');
      }, 2000);
    },
  });

  const handleSendInterest = () => {
    if (interestMessage.trim()) {
      sendInterestMutation.mutate(interestMessage);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">Profile not found</p>
          <Link href="/search" className="text-pink-600 hover:text-pink-700">
            ← Back to search
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/dashboard">
            <h1 className="text-2xl font-bold text-pink-600">💍 Matrimony</h1>
          </Link>
          <Link href="/search" className="text-gray-600 hover:text-pink-600">
            ← Back to search
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="h-64 bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center">
              {profile.photos && profile.photos.length > 0 ? (
                <img
                  src={profile.photos.find(p => p.isPrimary)?.url || profile.photos[0].url}
                  alt={`${profile.firstName} ${profile.lastName}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-9xl">👤</div>
              )}
            </div>
            
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {profile.firstName} {profile.lastName}
                  </h1>
                  <p className="text-xl text-gray-600">
                    {profile.age} years • {profile.city}, {profile.state}
                  </p>
                </div>
                <button
                  onClick={() => setShowInterestModal(true)}
                  className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
                >
                  ❤️ Send Interest
                </button>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-t border-b">
                <div className="text-center">
                  <p className="text-gray-600 text-sm mb-1">Height</p>
                  <p className="font-semibold">{profile.heightInCm} cm</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600 text-sm mb-1">Religion</p>
                  <p className="font-semibold">{profile.religion}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600 text-sm mb-1">Status</p>
                  <p className="font-semibold">{profile.maritalStatus}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600 text-sm mb-1">Education</p>
                  <p className="font-semibold">{profile.education}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="space-y-6">
            {/* Personal Details */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Personal Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Full Name</p>
                  <p className="font-semibold">{profile.firstName} {profile.lastName}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">Age</p>
                  <p className="font-semibold">{profile.age} years</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">Gender</p>
                  <p className="font-semibold">{profile.gender}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">Marital Status</p>
                  <p className="font-semibold">{profile.maritalStatus}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">Height</p>
                  <p className="font-semibold">{profile.heightInCm} cm</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">Mother Tongue</p>
                  <p className="font-semibold">{profile.motherTongue}</p>
                </div>
              </div>
            </div>

            {/* Religious Background */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Religious Background</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Religion</p>
                  <p className="font-semibold">{profile.religion}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">Community</p>
                  <p className="font-semibold">{profile.community}</p>
                </div>
              </div>
            </div>

            {/* Professional Details */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Professional Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Education</p>
                  <p className="font-semibold">{profile.education}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">Occupation</p>
                  <p className="font-semibold">{profile.occupation}</p>
                </div>
                {profile.annualIncome && (
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Annual Income</p>
                    <p className="font-semibold">${profile.annualIncome.toLocaleString()}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Location</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-gray-600 text-sm mb-1">City</p>
                  <p className="font-semibold">{profile.city}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">State</p>
                  <p className="font-semibold">{profile.state}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">Country</p>
                  <p className="font-semibold">{profile.country}</p>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">About</h2>
              <p className="text-gray-700 leading-relaxed">{profile.about}</p>
            </div>

            {/* Family Details */}
            {profile.familyDetails && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Family Details</h2>
                <p className="text-gray-700 leading-relaxed">{profile.familyDetails}</p>
              </div>
            )}

            {/* Hobbies */}
            {profile.hobbies && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Hobbies & Interests</h2>
                <p className="text-gray-700 leading-relaxed">{profile.hobbies}</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-4 justify-center">
            <button
              onClick={() => setShowInterestModal(true)}
              className="px-8 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
            >
              ❤️ Send Interest
            </button>
            <Link
              href="/search"
              className="px-8 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              ← Back to Search
            </Link>
          </div>
        </div>
      </main>

      {/* Send Interest Modal */}
      {showInterestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Send Interest</h2>
            
            {interestSent ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">✅</div>
                <p className="text-lg text-green-600 font-semibold">Interest sent successfully!</p>
              </div>
            ) : (
              <>
                <p className="text-gray-600 mb-4">
                  Send an interest to {profile?.firstName} with a personalized message
                </p>
                
                <textarea
                  value={interestMessage}
                  onChange={(e) => setInterestMessage(e.target.value)}
                  placeholder="Write a message to introduce yourself..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none mb-4 text-gray-900"
                />
                
                <div className="flex gap-3">
                  <button
                    onClick={handleSendInterest}
                    disabled={!interestMessage.trim() || sendInterestMutation.isPending}
                    className="flex-1 px-4 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {sendInterestMutation.isPending ? 'Sending...' : 'Send Interest'}
                  </button>
                  <button
                    onClick={() => {
                      setShowInterestModal(false);
                      setInterestMessage('');
                    }}
                    className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                  >
                    Cancel
                  </button>
                </div>

                {sendInterestMutation.isError && (
                  <p className="mt-3 text-sm text-red-600">
                    Failed to send interest. Please try again.
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


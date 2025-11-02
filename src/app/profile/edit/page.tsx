'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, type ProfileInput } from '@/lib/schemas/profile';
import { useProfile } from '@/hooks/useProfile';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { profileApi } from '@/lib/api/profile';
import Link from 'next/link';

export default function EditProfilePage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { updateProfile } = useProfile();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

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

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
  });

  // Reset form with profile data when loaded
  useEffect(() => {
    if (profile) {
      // Convert backend format to form format
      // Handle date conversion safely
      let dateOfBirth = '';
      try {
        const date = new Date(profile.dateOfBirth);
        if (!isNaN(date.getTime())) {
          dateOfBirth = date.toISOString().split('T')[0];
        }
      } catch (e) {
        console.error('Invalid date format:', e);
      }

      const formData = {
        firstName: profile.firstName,
        lastName: profile.lastName,
        dateOfBirth: dateOfBirth,
        gender: profile.gender as 'Male' | 'Female' | 'Other',
        religion: profile.religion,
        community: profile.community,
        motherTongue: profile.motherTongue,
        maritalStatus: profile.maritalStatus as 'NeverMarried' | 'Divorced' | 'Widowed' | 'AwaitingDivorce',
        heightInCm: profile.heightInCm,
        education: profile.education,
        occupation: profile.occupation,
        annualIncome: profile.annualIncome,
        country: profile.country,
        state: profile.state,
        city: profile.city,
        about: profile.about,
        familyDetails: profile.familyDetails || '',
        hobbies: profile.hobbies || '',
      };
      reset(formData);
    }
  }, [profile, reset]);

  const onSubmit = async (data: ProfileInput) => {
    try {
      setError('');
      setSuccess(false);
      
      await updateProfile(data);
      setSuccess(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || 'Failed to update profile. Please try again.');
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/dashboard">
            <h1 className="text-2xl font-bold text-pink-600">💍 Matrimony</h1>
          </Link>
          <Link href="/dashboard" className="text-gray-600 hover:text-pink-600">
            ← Back to Dashboard
          </Link>
        </div>
      </nav>

      <div className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Your Profile</h1>
              <p className="text-gray-600">Update your details to get better matches</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
                Profile updated successfully! Redirecting...
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Personal Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      {...register('firstName')}
                      type="text"
                      id="firstName"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      {...register('lastName')}
                      type="text"
                      id="lastName"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth *
                    </label>
                    <input
                      {...register('dateOfBirth')}
                      type="date"
                      id="dateOfBirth"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
                    />
                    {errors.dateOfBirth && (
                      <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                      Gender *
                    </label>
                    <select
                      {...register('gender')}
                      id="gender"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.gender && (
                      <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="maritalStatus" className="block text-sm font-medium text-gray-700 mb-2">
                      Marital Status *
                    </label>
                    <select
                      {...register('maritalStatus')}
                      id="maritalStatus"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
                    >
                      <option value="">Select Status</option>
                      <option value="NeverMarried">Never Married</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                      <option value="AwaitingDivorce">Awaiting Divorce</option>
                    </select>
                    {errors.maritalStatus && (
                      <p className="mt-1 text-sm text-red-600">{errors.maritalStatus.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="heightInCm" className="block text-sm font-medium text-gray-700 mb-2">
                      Height (cm) *
                    </label>
                    <input
                      {...register('heightInCm', { valueAsNumber: true })}
                      type="number"
                      id="heightInCm"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
                    />
                    {errors.heightInCm && (
                      <p className="mt-1 text-sm text-red-600">{errors.heightInCm.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Religious & Cultural */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Religious & Cultural Background</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="religion" className="block text-sm font-medium text-gray-700 mb-2">
                      Religion *
                    </label>
                    <input
                      {...register('religion')}
                      type="text"
                      id="religion"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
                    />
                    {errors.religion && (
                      <p className="mt-1 text-sm text-red-600">{errors.religion.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="community" className="block text-sm font-medium text-gray-700 mb-2">
                      Community *
                    </label>
                    <input
                      {...register('community')}
                      type="text"
                      id="community"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
                    />
                    {errors.community && (
                      <p className="mt-1 text-sm text-red-600">{errors.community.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="motherTongue" className="block text-sm font-medium text-gray-700 mb-2">
                      Mother Tongue *
                    </label>
                    <input
                      {...register('motherTongue')}
                      type="text"
                      id="motherTongue"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
                    />
                    {errors.motherTongue && (
                      <p className="mt-1 text-sm text-red-600">{errors.motherTongue.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Professional Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-2">
                      Education *
                    </label>
                    <input
                      {...register('education')}
                      type="text"
                      id="education"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
                    />
                    {errors.education && (
                      <p className="mt-1 text-sm text-red-600">{errors.education.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-2">
                      Occupation *
                    </label>
                    <input
                      {...register('occupation')}
                      type="text"
                      id="occupation"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
                    />
                    {errors.occupation && (
                      <p className="mt-1 text-sm text-red-600">{errors.occupation.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="annualIncome" className="block text-sm font-medium text-gray-700 mb-2">
                      Annual Income (Optional)
                    </label>
                    <input
                      {...register('annualIncome', { valueAsNumber: true })}
                      type="number"
                      id="annualIncome"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Location</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                      Country *
                    </label>
                    <input
                      {...register('country')}
                      type="text"
                      id="country"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
                    />
                    {errors.country && (
                      <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                      State *
                    </label>
                    <input
                      {...register('state')}
                      type="text"
                      id="state"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
                    />
                    {errors.state && (
                      <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      {...register('city')}
                      type="text"
                      id="city"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* About You */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">About You</h2>
                
                <div>
                  <label htmlFor="about" className="block text-sm font-medium text-gray-700 mb-2">
                    About Me *
                  </label>
                  <textarea
                    {...register('about')}
                    id="about"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
                  />
                  {errors.about && (
                    <p className="mt-1 text-sm text-red-600">{errors.about.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="familyDetails" className="block text-sm font-medium text-gray-700 mb-2">
                    Family Details (Optional)
                  </label>
                  <textarea
                    {...register('familyDetails')}
                    id="familyDetails"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="hobbies" className="block text-sm font-medium text-gray-700 mb-2">
                    Hobbies & Interests (Optional)
                  </label>
                  <textarea
                    {...register('hobbies')}
                    id="hobbies"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Updating Profile...' : 'Update Profile'}
                </button>
                <Link
                  href="/dashboard"
                  className="px-8 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-center"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}


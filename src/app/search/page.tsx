'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { searchSchema } from '@/lib/schemas/profile';
import { searchApi, type SearchResponse } from '@/lib/api/search';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SearchPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [showFilters, setShowFilters] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResponse | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const {
    register,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      pageNumber: 1,
      pageSize: 20,
    },
  });

  const onSubmit = async (data: Record<string, unknown>) => {
    try {
      setIsSearching(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const results = await searchApi.searchProfiles(data as any);
      setSearchResults(results);
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setIsSearching(false);
    }
  };

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

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Profiles</h1>
            <p className="text-gray-600">Find your perfect match using advanced filters</p>
          </div>

          {/* Filter Toggle Button */}
          <div className="mb-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition flex items-center gap-2"
            >
              {showFilters ? '🔼 Hide Filters' : '🔽 Show Filters'}
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender
                    </label>
                    <select
                      {...register('gender')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none text-gray-900"
                    >
                      <option value="">Any</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Min Age
                    </label>
                    <input
                      {...register('minAge', { valueAsNumber: true })}
                      type="number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none text-gray-900"
                      placeholder="25"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Age
                    </label>
                    <input
                      {...register('maxAge', { valueAsNumber: true })}
                      type="number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none text-gray-900"
                      placeholder="35"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Religion
                    </label>
                    <input
                      {...register('religion')}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none text-gray-900"
                      placeholder="Christianity, Islam, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Community
                    </label>
                    <input
                      {...register('community')}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Marital Status
                    </label>
                    <select
                      {...register('maritalStatus')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none text-gray-900"
                    >
                      <option value="">Any</option>
                      <option value="NeverMarried">Never Married</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                      <option value="AwaitingDivorce">Awaiting Divorce</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Education
                    </label>
                    <input
                      {...register('education')}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none text-gray-900"
                      placeholder="Bachelor's, Master's, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Occupation
                    </label>
                    <input
                      {...register('occupation')}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Min Height (cm)
                    </label>
                    <input
                      {...register('minHeightInCm', { valueAsNumber: true })}
                      type="number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none text-gray-900"
                      placeholder="160"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <input
                      {...register('country')}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State
                    </label>
                    <input
                      {...register('state')}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      {...register('city')}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none text-gray-900"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSearching}
                  className="w-full py-3 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition disabled:opacity-50"
                >
                  {isSearching ? 'Searching...' : '🔍 Search'}
                </button>
              </form>
            </div>
          )}

          {/* Search Results */}
          {searchResults && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Search Results ({searchResults.totalCount} matches)
                </h2>
              </div>

              {searchResults.profiles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.profiles.map((profile) => (
                    <Link
                      key={profile.id}
                      href={`/profile/${profile.id}`}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition"
                    >
                      <div className="h-48 bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center">
                        {profile.primaryPhotoUrl ? (
                          <img
                            src={profile.primaryPhotoUrl}
                            alt={profile.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-6xl">👤</div>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {profile.name}
                        </h3>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>{profile.age} years • {profile.heightInCm} cm</p>
                          <p>{profile.religion} - {profile.community}</p>
                          <p>{profile.education}</p>
                          <p>{profile.occupation}</p>
                          <p>{profile.city}, {profile.state}</p>
                        </div>
                        <div className="mt-4">
                          <span className="inline-block px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm">
                            {profile.maritalStatus}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-xl">
                  <p className="text-gray-600 text-lg">No profiles found. Try adjusting your filters.</p>
                </div>
              )}

              {/* Pagination */}
              {searchResults.totalPages > 1 && (
                <div className="mt-8 flex justify-center gap-2">
                  {Array.from({ length: searchResults.totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handleSubmit((data) => onSubmit({ ...data, pageNumber: page }))()}
                      className={`px-4 py-2 rounded-lg ${
                        page === searchResults.pageNumber
                          ? 'bg-pink-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {!searchResults && !isSearching && (
            <div className="text-center py-12 bg-white rounded-xl">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-gray-600 text-lg">Use the filters above to search for profiles</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}


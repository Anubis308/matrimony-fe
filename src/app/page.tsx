import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-pink-600">💍 Matrimony</h1>
          <div className="space-x-4">
            <Link
              href="/login"
              className="px-4 py-2 text-gray-700 hover:text-pink-600 transition"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
            >
              Register
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Find Your Perfect Life Partner
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Join thousands of people finding meaningful connections on our trusted matrimony platform
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="p-6 bg-white rounded-xl shadow-lg">
              <div className="text-4xl mb-4">👤</div>
              <h3 className="text-xl font-semibold mb-2">Create Profile</h3>
              <p className="text-gray-600">
                Build a detailed profile with your preferences and requirements
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-lg">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">Search & Match</h3>
              <p className="text-gray-600">
                Find compatible matches based on your partner preferences
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-lg">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-semibold mb-2">Connect</h3>
              <p className="text-gray-600">
                Send interests and start conversations with potential matches
              </p>
            </div>
          </div>

          <div className="space-x-4">
            <Link
              href="/register"
              className="inline-block px-8 py-4 bg-pink-600 text-white text-lg font-semibold rounded-lg hover:bg-pink-700 transition shadow-lg"
            >
              Get Started Free
            </Link>
            <Link
              href="/search"
              className="inline-block px-8 py-4 bg-white text-pink-600 text-lg font-semibold rounded-lg hover:bg-gray-50 transition shadow-lg border-2 border-pink-600"
            >
              Browse Profiles
            </Link>
          </div>
        </div>

        <div className="mt-24 grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-pink-600 mb-2">10K+</div>
            <div className="text-gray-600">Active Users</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-pink-600 mb-2">5K+</div>
            <div className="text-gray-600">Successful Matches</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-pink-600 mb-2">50+</div>
            <div className="text-gray-600">Communities</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-pink-600 mb-2">100%</div>
            <div className="text-gray-600">Verified Profiles</div>
          </div>
        </div>
      </main>

      <footer className="border-t mt-24 py-8 bg-white">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2024 Matrimony. All rights reserved.</p>
          <div className="mt-4 space-x-6">
            <Link href="/about" className="hover:text-pink-600 transition">About</Link>
            <Link href="/privacy" className="hover:text-pink-600 transition">Privacy</Link>
            <Link href="/terms" className="hover:text-pink-600 transition">Terms</Link>
            <Link href="/contact" className="hover:text-pink-600 transition">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}


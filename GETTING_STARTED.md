# 🚀 Getting Started - Matrimony Frontend

## ✅ Setup Complete!

Your Next.js frontend is ready to go with:
- ✅ Next.js 15 with App Router
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ TanStack Query
- ✅ Zod validation
- ✅ Zustand state management
- ✅ Axios API client
- ✅ React Hook Form

## 🏃 Quick Start (3 Steps)

### 1. Make Sure Backend is Running

```bash
cd ../matrimony/MatrimonyAPI
dotnet restore
dotnet run
```

Backend should be at: `https://localhost:5001`

### 2. Start Frontend

```bash
# In matrimony-fe directory
npm run dev
```

### 3. Open Browser

Visit: http://localhost:3000

## 📁 What's Included

### API Integration (`src/lib/api/`)
- ✅ `client.ts` - Axios instance with JWT interceptors
- ✅ `auth.ts` - Login, register, change password
- ✅ `profile.ts` - Profile CRUD operations
- ✅ `search.ts` - Search and match endpoints

### Validation Schemas (`src/lib/schemas/`)
- ✅ `auth.ts` - Login/register validation
- ✅ `profile.ts` - Profile and search validation

### Custom Hooks (`src/hooks/`)
- ✅ `useAuth.ts` - Authentication logic
- ✅ `useProfile.ts` - Profile management
- ✅ `useSearch.ts` - Search functionality

### Pages (`src/app/`)
- ✅ `page.tsx` - Beautiful landing page
- 🔨 `login/` - TO CREATE
- 🔨 `register/` - TO CREATE
- 🔨 `dashboard/` - TO CREATE
- 🔨 `profile/` - TO CREATE
- 🔨 `search/` - TO CREATE

## 🎯 Next Steps

### 1. Create Login Page

Create `src/app/login/page.tsx`:

```typescript
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginInput } from '@/lib/schemas/auth';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema)
  });
  const { login, isLoading } = useAuth();

  const onSubmit = async (data: LoginInput) => {
    try {
      await login(data);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Welcome Back
        </h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              {...register('email')}
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              {...register('password')}
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{' '}
          <Link href="/register" className="text-pink-600 hover:underline font-semibold">
            Register here
          </Link>
        </p>
        
        <Link href="/" className="block text-center mt-4 text-gray-500 hover:text-gray-700">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
```

### 2. Create Register Page

Create `src/app/register/page.tsx` using similar pattern with `registerSchema`

### 3. Test the Flow

1. Go to http://localhost:3000
2. Click "Register"
3. Fill the form
4. Auto-redirect to profile creation
5. Complete profile
6. Start searching!

## 🎨 Design System

### Colors
- Primary: `pink-600`
- Hover: `pink-700`
- Background: Gradient from `pink-50` to `purple-50`
- Text: `gray-700`, `gray-800`, `gray-900`

### Components Pattern
```tsx
// Button
<button className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition">

// Card
<div className="p-6 bg-white rounded-xl shadow-lg">

// Input
<input className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500">
```

## 📦 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
```

## 🔌 API Endpoints Available

All configured in `src/lib/api/`:

### Auth
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/change-password`
- `GET /auth/me`

### Profile
- `POST /profile`
- `GET /profile/me`
- `GET /profile/{id}`
- `PUT /profile`
- `POST /profile/photos`

### Search
- `POST /search`
- `GET /search/matches`

## 🐛 Troubleshooting

### Backend Not Responding

```bash
# Check backend is running
cd ../matrimony/MatrimonyAPI
dotnet run
```

### Port 3000 Already in Use

```bash
# Kill the process or use different port
npm run dev -- -p 3001
```

### TypeScript Errors

```bash
# Clear cache
rm -rf .next
rm -rf node_modules
npm install
npm run dev
```

## 📚 Key Files to Know

- `src/app/layout.tsx` - Root layout with QueryProvider
- `src/lib/api/client.ts` - Axios interceptors for JWT
- `src/store/authStore.ts` - Authentication state
- `src/hooks/useAuth.ts` - Auth operations

## 🎯 Development Workflow

1. Create page in `src/app/`
2. Use existing hooks (`useAuth`, `useProfile`, `useSearch`)
3. Forms use Zod validation
4. API calls automatic with TanStack Query
5. State managed by Zustand

## ✨ Features Ready to Use

- ✅ JWT authentication with auto-refresh
- ✅ Form validation with Zod
- ✅ API caching with TanStack Query
- ✅ Responsive design with Tailwind
- ✅ Type-safe API client
- ✅ Global state management

## 🚀 You're Ready!

Everything is set up. Just create the pages and start building!

**Start with login page, then build from there.** 

All the hard infrastructure work is done! 🎉


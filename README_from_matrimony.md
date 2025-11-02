# 💍 Matrimony Frontend

A modern Next.js frontend for the Matrimony API built with TypeScript, Tailwind CSS, and TanStack Query.

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Form Validation**: Zod + React Hook Form
- **API Client**: Axios + TanStack Query
- **Icons**: React Icons (optional, can be added)

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🔧 Configuration

Create `.env.local` file:

```env
NEXT_PUBLIC_API_URL=https://localhost:5001/api
```

##  Project Structure

```
matrimony-fe/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Home page
│   │   ├── login/             # Login page
│   │   ├── register/          # Registration page
│   │   ├── dashboard/         # User dashboard
│   │   ├── profile/           # Profile pages
│   │   └── search/            # Search page
│   ├── components/            # Reusable components
│   ├── hooks/                 # Custom React hooks
│   │   ├── useAuth.ts        # Authentication hook
│   │   ├── useProfile.ts     # Profile management
│   │   └── useSearch.ts      # Search functionality
│   ├── lib/
│   │   ├── api/              # API client functions
│   │   │   ├── client.ts     # Axios instance
│   │   │   ├── auth.ts       # Auth endpoints
│   │   │   ├── profile.ts    # Profile endpoints
│   │   │   └── search.ts     # Search endpoints
│   │   ├── schemas/          # Zod validation schemas
│   │   │   ├── auth.ts
│   │   │   └── profile.ts
│   │   └── providers/        # React providers
│   │       └── query-provider.tsx
│   └── store/
│       └── authStore.ts      # Zustand auth store
└── public/                    # Static assets
```

## 🎯 Features

### ✅ Completed

- ✅ Project setup with Next.js, TypeScript, and Tailwind
- ✅ TanStack Query integration
- ✅ Zod schema validation
- ✅ API client with Axios interceptors
- ✅ Authentication store with Zustand
- ✅ Custom hooks for auth, profile, and search
- ✅ Beautiful landing page
- ✅ Responsive design

### 🚧 To Implement

Create these pages (starter templates provided):

```typescript
// src/app/login/page.tsx
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginInput } from '@/lib/schemas/auth';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema)
  });
  const { login, isLoading } = useAuth();

  const onSubmit = async (data: LoginInput) => {
    await login(data);
  };

  return (
    // Build your login form here
  );
}
```

## 🔐 Authentication Flow

1. User registers → JWT token received → Auto-login
2. User logs in → Token stored in localStorage + Zustand
3. API requests automatically include token (via interceptor)
4. Token expired (401) → Auto-logout → Redirect to login

## 📝 API Integration Examples

### Using Auth Hook

```typescript
const { login, register, logout, isLoading } = useAuth();

// Login
await login({ email, password });

// Register
await register({ email, password, phoneNumber });

// Logout
logout();
```

### Using Profile Hook

```typescript
const { profile, createProfile, updateProfile, isLoading } = useProfile();

// Create profile
await createProfile(profileData);

// Update profile
await updateProfile({ education: "Master's" });
```

### Using Search Hook

```typescript
const { profiles, setFilters, isLoading } = useSearch();

// Apply filters
setFilters({
  minAge: 25,
  maxAge: 35,
  gender: 'Female',
  city: 'Mumbai'
});
```

## 🎨 Styling Guide

Tailwind CSS utility classes are configured. Example patterns:

```tsx
// Button
<button className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition">
  Submit
</button>

// Card
<div className="p-6 bg-white rounded-xl shadow-lg">
  Content
</div>

// Form Input
<input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500" />
```

## 🔍 Form Validation with Zod

All schemas are in `src/lib/schemas/`:

```typescript
// Example: Profile form
const form = useForm<ProfileInput>({
  resolver: zodResolver(profileSchema)
});

// Zod automatically validates:
// - Required fields
// - Email format
// - Password strength
// - Number ranges
// - Custom rules
```

## 📱 Pages to Create

### Priority 1 (Authentication)
- [ ] `/login` - Login page
- [ ] `/register` - Registration page

### Priority 2 (Core Features)
- [ ] `/dashboard` - User dashboard
- [ ] `/profile/create` - Create profile form
- [ ] `/profile/edit` - Edit profile
- [ ] `/profile/[id]` - View profile

### Priority 3 (Social Features)
- [ ] `/search` - Search profiles
- [ ] `/matches` - Recommended matches
- [ ] `/interests` - Sent/received interests
- [ ] `/messages` - Chat interface

## 🎯 Quick Start Guide

### 1. Start Development Server

```bash
npm run dev
```

Visit http://localhost:3000

### 2. Test API Connection

The API client is configured to connect to your backend at:
`https://localhost:5001/api`

Make sure your backend is running!

### 3. Create Your First Page

Example: Login page at `src/app/login/page.tsx`

```typescript
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/lib/schemas/auth';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema)
  });
  const { login, isLoading } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-8">Login</h2>
        
        <form onSubmit={handleSubmit(login)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              {...register('email')}
              type="email"
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              {...register('password')}
              type="password"
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:opacity-50"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center mt-4">
          Don't have an account?{' '}
          <Link href="/register" className="text-pink-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [Zod Documentation](https://zod.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Hook Form](https://react-hook-form.com/)

## 🐛 Troubleshooting

### API Connection Issues

```bash
# Make sure backend is running
cd ../matrimony/MatrimonyAPI
dotnet run
```

### CORS Errors

Backend CORS is configured to allow all origins in development. If issues persist, check your backend's CORS configuration.

### TypeScript Errors

```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## ⭐ Next Steps

1. ✅ Setup complete
2. Create login/register pages
3. Build profile creation form
4. Implement search functionality
5. Add messaging feature
6. Deploy to Vercel

## 📧 API Reference

Backend API documentation: `../matrimony/API_ENDPOINTS.md`

---

Built with ❤️ using Next.js and TanStack Query


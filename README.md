# 💍 Matrimony Frontend

A modern, full-featured matrimony/matchmaking platform built with **Next.js 16**, **React 19**, and **TypeScript**.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

## ✨ Features

- 🔐 **JWT Authentication** - Secure login and registration
- 👤 **Profile Management** - Create, edit, and view detailed profiles
- 🔍 **Advanced Search** - Filter by age, religion, location, education, and more
- ❤️ **Interest System** - Send, receive, accept, and reject connection requests
- 💬 **Real-time Messaging** - Chat interface for connected users
- 📱 **Responsive Design** - Works perfectly on all devices
- ✅ **Form Validation** - Zod schemas with React Hook Form
- 🎨 **Beautiful UI** - Modern design with Tailwind CSS

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Backend API running at `https://localhost:5001`

### Installation

```bash
# Install dependencies
npm install

# Set up environment (create .env.local)
echo "NEXT_PUBLIC_API_URL=https://localhost:5001/api" > .env.local

# Run development server
npm run dev
```

**Open:** http://localhost:3000

## 📁 Pages

| Page | Route | Description |
|------|-------|-------------|
| Landing | `/` | Homepage with features showcase |
| Login | `/login` | User authentication |
| Register | `/register` | New user registration |
| Dashboard | `/dashboard` | User home with quick actions |
| Create Profile | `/profile/create` | Detailed profile creation form |
| Edit Profile | `/profile/edit` | Update profile information |
| View Profile | `/profile/[id]` | View user profiles |
| Search | `/search` | Advanced profile search with filters |
| Interests | `/interests` | Manage sent/received interests |
| Messages | `/messages` | Chat with connections |

## 🛠️ Tech Stack

### Core
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety

### State & Data
- **TanStack Query v5** - Server state management
- **Zustand** - Client state (auth)
- **Axios** - HTTP client

### Forms & Validation
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Styling
- **Tailwind CSS v4** - Utility-first CSS
- **PostCSS** - CSS processing

## 📖 Documentation

- **[COMPLETE_GUIDE.md](COMPLETE_GUIDE.md)** - Comprehensive documentation
- **[GETTING_STARTED.md](GETTING_STARTED.md)** - Step-by-step setup guide

## 🎯 Key Features Explained

### Authentication Flow
1. Register → Auto-login → Create profile → Dashboard
2. JWT token stored in localStorage
3. Auto-redirect on token expiration
4. Protected routes with authentication checks

### Profile Management
- Comprehensive profile creation with 20+ fields
- Personal, religious, professional, and location details
- Profile editing with pre-filled data
- Profile viewing with beautiful layout

### Search System
- Advanced filters (gender, age, religion, etc.)
- Collapsible filter panel
- Profile cards with key information
- Pagination support
- Click through to full profiles

### Interest System
- Send interests with personalized messages
- View received and sent interests
- Accept/Reject functionality
- Status tracking (Pending, Accepted, Rejected)
- Integration with messaging

### Messaging
- Conversation list with last message preview
- Real-time chat interface
- Message timestamps and read status
- Unread message counts
- Auto-scroll to latest messages

## 🎨 Design System

### Colors
```css
Primary: #db2777 (pink-600)
Hover: #be185d (pink-700)
Background: Gradient from pink-50 to purple-50
```

### Components
```tsx
// Primary Button
<button className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition">

// Input Field
<input className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500">

// Card
<div className="bg-white rounded-xl shadow-lg p-6">
```

## 🔧 Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Start production
npm start

# Lint code
npm run lint
```

## 🌐 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import in Vercel
3. Add environment variable: `NEXT_PUBLIC_API_URL`
4. Deploy!

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📊 Project Status

✅ **All Pages Completed**  
✅ **All Features Implemented**  
✅ **Full API Integration**  
✅ **Responsive Design**  
✅ **Production Ready**

**Total:** 10 pages, 20+ components, 3,000+ lines of code

## 🧪 Testing

### Manual Testing Checklist
- [x] User registration and login
- [x] Profile creation and editing
- [x] Search with various filters
- [x] Send and respond to interests
- [x] Send and receive messages
- [x] Navigation and routing
- [x] Form validation
- [x] Error handling

## 🤝 Integration with Backend

The frontend integrates seamlessly with the Matrimony API:
- **Base URL:** `https://localhost:5001/api`
- **Authentication:** JWT Bearer tokens
- **Auto-refresh:** Token management
- **Error handling:** 401 auto-logout

## 📝 Environment Variables

Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=https://localhost:5001/api
```

## 🐛 Troubleshooting

**Issue:** Cannot connect to API  
**Solution:** Ensure backend is running and CORS is enabled

**Issue:** 401 Unauthorized  
**Solution:** Login again to get a new token

**Issue:** Profile not loading  
**Solution:** Create profile first from `/profile/create`

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TanStack Query](https://tanstack.com/query)
- [Tailwind CSS](https://tailwindcss.com)

## 🎉 Ready to Use!

The frontend is **fully complete** and **production-ready**. Start the backend, run `npm run dev`, and explore all features!

```bash
npm run dev
```

Then open: **http://localhost:3000**

---

**Built with ❤️ using Next.js, React, and TypeScript**

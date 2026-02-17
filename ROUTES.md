# Application Routes

This document outlines all routes in the Smart Bookmark Application.

## Public Routes

### `/` (Home Page)
- **File**: `app/page.tsx`
- **Type**: Server Component
- **Access**: Public (redirects to `/dashboard` if authenticated)
- **Purpose**: Landing page with sign-in CTA
- **Features**:
  - Hero section with app branding
  - Google OAuth sign-in button
  - Feature showcase
  - "How it works" section
  - Login status indicator

### `/auth/signin` (Sign In Page)
- **File**: `app/auth/signin/page.tsx`
- **Type**: Server Component
- **Access**: Public (redirects to `/dashboard` if authenticated)
- **Purpose**: Initiates Google OAuth flow
- **Flow**: Redirects to Google OAuth → `/auth/callback`

### `/auth/callback` (OAuth Callback)
- **File**: `app/auth/callback/route.ts`
- **Type**: API Route Handler
- **Access**: Public (handles OAuth redirect)
- **Purpose**: Exchanges OAuth code for session
- **Flow**: 
  1. Receives OAuth code from Google
  2. Exchanges code for session
  3. Creates/updates user profile in `public.users` table
  4. Redirects to `/dashboard`

## Protected Routes

### `/dashboard` (Dashboard)
- **File**: `app/dashboard/page.tsx`
- **Type**: Server Component
- **Access**: Protected (redirects to `/` if not authenticated)
- **Purpose**: Main application interface
- **Features**:
  - Welcome header with user email
  - Bookmark statistics
  - Add bookmark form
  - Bookmarks list with real-time updates
  - Getting started tips (for new users)

## Special Routes

### `/loading` (Loading State)
- **File**: `app/loading.tsx`
- **Type**: Server Component
- **Access**: Public
- **Purpose**: Shows loading spinner during page transitions

### `/not-found` (404 Page)
- **File**: `app/not-found.tsx`
- **Type**: Server Component
- **Access**: Public
- **Purpose**: Custom 404 error page

## Route Protection

Route protection is handled by `app/proxy.ts`:
- Checks authentication status on every request
- Redirects unauthenticated users from `/dashboard` to `/`
- Redirects authenticated users from `/` and `/auth/signin` to `/dashboard`

## Navigation Flow

```
Unauthenticated User:
  / → /auth/signin → Google OAuth → /auth/callback → /dashboard

Authenticated User:
  / → /dashboard (auto-redirect)
  /auth/signin → /dashboard (auto-redirect)
  /dashboard → (stays on dashboard)
```

## Components Used

- **Navbar**: Shows on all pages, displays login status
- **BookmarkForm**: Used in `/dashboard` for adding bookmarks
- **BookmarkList**: Used in `/dashboard` for displaying bookmarks with real-time updates

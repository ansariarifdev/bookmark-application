# Implementation Guide

This document explains the key implementation details of the Smart Bookmark Application.

## 🗄️ Database Schema

### Tables

**public.users**
- Stores user profile information
- Automatically created when a user signs up via the trigger
- Linked to `auth.users` via foreign key with CASCADE DELETE

**public.bookmarks**
- Stores user bookmarks
- Indexed on `user_id` for fast queries
- Linked to `public.users` with CASCADE DELETE

### Row Level Security (RLS)

RLS ensures users can only access their own data:

1. **Users Table Policies:**
   - `SELECT`: Users can only read their own profile (`auth.uid() = id`)

2. **Bookmarks Table Policies:**
   - `SELECT`: Users can only read their own bookmarks (`auth.uid() = user_id`)
   - `INSERT`: Users can only insert bookmarks with their own `user_id`
   - `DELETE`: Users can only delete their own bookmarks

### Trigger

The `handle_new_user()` trigger automatically creates a profile in `public.users` when a new user signs up via Supabase Auth. This ensures every authenticated user has a corresponding profile record.

## 🔐 Authentication Flow

### 1. Sign In Process

```
User clicks "Sign in with Google"
  ↓
/app/auth/signin (Server Component)
  ↓
Supabase signInWithOAuth() called
  ↓
Redirects to Google OAuth
  ↓
User authorizes
  ↓
Google redirects to /app/auth/callback
  ↓
exchangeCodeForSession() exchanges code for session
  ↓
User redirected to /dashboard
```

### 2. Session Management

- **Server Components**: Use `createClient()` from `lib/supabase-server.ts`
- **Client Components**: Use `createClient()` from `lib/supabase-client.ts`
- **Middleware**: Refreshes sessions and protects routes

### 3. Route Protection

The `app/proxy.ts` file:
- Runs on every request
- Refreshes the auth session
- Redirects unauthenticated users away from `/dashboard`

## 🔄 Realtime Implementation

### Subscription Setup

The `BookmarkList` component subscribes to changes:

```typescript
const channel = supabase
  .channel('bookmarks-changes')
  .on('postgres_changes', {
    event: '*',  // Listen to all events
    schema: 'public',
    table: 'bookmarks',
    filter: `user_id=eq.${user.id}`,  // Only user's bookmarks
  }, (payload) => {
    // Handle INSERT, UPDATE, DELETE
  })
  .subscribe()
```

### Event Handling

- **INSERT**: New bookmark added → Add to list with animation
- **DELETE**: Bookmark deleted → Remove from list
- **UPDATE**: (Not implemented, but can be added)

### Cleanup

Subscriptions are properly cleaned up on component unmount:

```typescript
return () => {
  supabase.removeChannel(channel)
}
```

## 🎨 UI/UX Features

### Animations

Using Motion (Framer Motion):

1. **Navbar**: Fade-in on load
2. **BookmarkForm**: Scale animation on successful submit
3. **BookmarkList**: 
   - New bookmarks: Slide-in animation
   - Deleted bookmarks: Fade-out animation
   - Staggered entry animations

### Responsive Design

- Mobile-first approach
- Breakpoints: `sm:`, `md:`, `lg:`
- Flexible layouts with Tailwind Grid/Flexbox

### Accessibility

- Semantic HTML
- ARIA labels on buttons
- Keyboard navigation support
- Focus states on interactive elements

## 📁 File Structure Explained

### `/app` Directory (App Router)

- `layout.tsx`: Root layout with Navbar
- `page.tsx`: Home page (public)
- `dashboard/page.tsx`: Protected dashboard (server component)
- `auth/signin/page.tsx`: OAuth initiation (server component)
- `auth/callback/route.ts`: OAuth callback handler (API route)

### `/components` Directory

- `Navbar.tsx`: Client component for navigation
- `BookmarkForm.tsx`: Client component with form state
- `BookmarkList.tsx`: Client component with realtime subscription
- `ui/`: Shadcn UI components

### `/lib` Directory

- `supabase-client.ts`: Browser client (uses cookies)
- `supabase-server.ts`: Server client (uses Next.js cookies)
- `utils.ts`: Utility functions (cn helper)

### Root Files

- `app/proxy.ts`: Auth proxy for route protection
- `supabase-schema.sql`: Database schema and policies

## 🔧 Key Technical Decisions

### Why @supabase/ssr?

- Proper cookie handling for Next.js App Router
- Server and client components work seamlessly
- Automatic session refresh

### Why Server Components?

- Better performance (no JavaScript sent to client)
- Direct database access
- SEO-friendly

### Why Client Components for Forms/Realtime?

- Need interactivity (form state, realtime subscriptions)
- Need browser APIs (animations, DOM manipulation)

### Why Motion?

- Smooth, performant animations
- Declarative API
- Built-in gesture support

## 🚀 Production Considerations

### Environment Variables

Required for production:
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Public anon key (safe to expose)
- `NEXT_PUBLIC_SITE_URL`: Your deployment URL (for OAuth redirects)

### Security

- ✅ RLS policies prevent unauthorized access
- ✅ Only anon key used (never service role key)
- ✅ Server-side auth verification
- ✅ Protected routes via proxy

### Performance

- ✅ Server Components reduce client bundle
- ✅ Indexed database queries
- ✅ Optimized realtime subscriptions (filtered by user_id)
- ✅ Proper cleanup of subscriptions

### Scalability

- ✅ Supabase handles connection pooling
- ✅ RLS scales with user base
- ✅ Realtime subscriptions are efficient
- ✅ Vercel edge network for fast global access

## 🐛 Common Issues & Solutions

### Realtime Not Working

**Problem**: Changes don't appear in real-time

**Solutions**:
1. Enable replication in Supabase Dashboard → Database → Replication
2. Check RLS policies allow SELECT
3. Verify subscription filter matches user_id

### OAuth Redirect Errors

**Problem**: "Redirect URI mismatch" error

**Solutions**:
1. Ensure redirect URLs match exactly in:
   - Google Cloud Console
   - Supabase Auth settings
   - `NEXT_PUBLIC_SITE_URL` env variable
2. Use HTTPS in production
3. No trailing slashes in URLs

### Type Errors

**Problem**: TypeScript errors in components

**Solutions**:
1. Ensure `types/database.ts` matches your schema
2. Run `bun run build` to check for errors
3. Update types if schema changes

## 📚 Additional Resources

- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Supabase Realtime Docs](https://supabase.com/docs/guides/realtime)
- [Motion Docs](https://motion.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

# Smart Bookmark Application

A production-ready bookmark management application built with Next.js 14+, TypeScript, Supabase, and Tailwind CSS. Features real-time synchronization, Google OAuth authentication, and a beautiful, responsive UI.

## 🚀 Features

- **Google OAuth Authentication** - Secure sign-in with Google only
- **Real-time Sync** - Bookmarks update instantly across all open tabs/devices
- **Modern UI** - Beautiful gradients, animations, and micro-interactions
- **Responsive Design** - Works seamlessly on desktop and mobile
- **Type-Safe** - Full TypeScript support
- **Production-Ready** - Optimized for deployment on Vercel

## 📋 Prerequisites

- Node.js 18+ or Bun
- Supabase account
- Google OAuth credentials

## 🛠️ Setup Instructions

### 1. Clone and Install Dependencies

```bash
bun install
# or
npm install
```

### 2. Set Up Supabase

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** in your Supabase dashboard
3. Run the SQL schema from `supabase-schema.sql`:

```sql
-- Copy and paste the entire contents of supabase-schema.sql
```

This will create:
- `public.users` table
- `public.bookmarks` table
- Row Level Security (RLS) policies
- Trigger for auto-creating user profiles

### 3. Enable Realtime

1. In Supabase Dashboard, go to **Database** → **Replication**
2. Enable replication for the `bookmarks` table
3. This allows real-time subscriptions to work

### 4. Configure Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable **Google+ API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure:
   - **Application type**: Web application
   - **Authorized redirect URIs**: 
     - `http://localhost:3000/auth/callback` (for local development)
     - `https://your-domain.vercel.app/auth/callback` (for production)
6. Copy the **Client ID** and **Client Secret**

### 5. Configure Supabase Auth

1. In Supabase Dashboard, go to **Authentication** → **Providers**
2. Enable **Google** provider
3. Enter your Google OAuth **Client ID** and **Client Secret**
4. Add redirect URLs:
   - `http://localhost:3000/auth/callback`
   - `https://your-domain.vercel.app/auth/callback`

### 6. Environment Variables

Create a `.env.local` file (or update `.env`) with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

For production, update `NEXT_PUBLIC_SITE_URL` to your Vercel deployment URL.

### 7. Run Development Server

```bash
bun dev
# or
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
bookmark-application/
├── app/
│   ├── auth/
│   │   ├── callback/
│   │   │   └── route.ts          # OAuth callback handler
│   │   └── signin/
│   │       └── page.tsx          # Google OAuth sign-in page
│   ├── dashboard/
│   │   └── page.tsx              # Protected dashboard page
│   ├── layout.tsx                # Root layout with Navbar
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
├── components/
│   ├── ui/
│   │   ├── button.tsx           # Shadcn button component
│   │   └── input.tsx             # Shadcn input component
│   ├── Navbar.tsx                # Navigation bar
│   ├── BookmarkForm.tsx          # Add bookmark form
│   └── BookmarkList.tsx          # Bookmarks list with realtime
├── lib/
│   ├── supabase-client.ts        # Browser Supabase client
│   ├── supabase-server.ts        # Server Supabase client
│   └── utils.ts                  # Utility functions
├── app/proxy.ts                   # Auth proxy (route protection)
├── supabase-schema.sql            # Database schema
└── types/
    └── database.ts               # TypeScript types
```

## 🚢 Deployment to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **New Project**
3. Import your GitHub repository
4. Configure environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` (set to your Vercel URL, e.g., `https://your-app.vercel.app`)
5. Click **Deploy**

### 3. Update Supabase Redirect URLs

After deployment, update your Supabase Google OAuth redirect URL to include your Vercel domain:
- Go to **Authentication** → **Providers** → **Google**
- Add: `https://your-app.vercel.app/auth/callback`

### 4. Update Google OAuth Redirect URIs

In Google Cloud Console:
- Add: `https://your-app.vercel.app/auth/callback` to authorized redirect URIs

## 🔒 Security Features

- **Row Level Security (RLS)** - Users can only access their own data
- **Server-side Auth** - Authentication verified on the server
- **Protected Routes** - Middleware redirects unauthenticated users
- **CORS Protection** - Supabase handles CORS automatically

## 🎨 Key Implementation Details

### Realtime Subscriptions

The `BookmarkList` component uses Supabase Realtime to subscribe to changes:

```typescript
const channel = supabase
  .channel('bookmarks-changes')
  .on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'bookmarks',
    filter: `user_id=eq.${user.id}`,
  }, (payload) => {
    // Handle INSERT, UPDATE, DELETE events
  })
  .subscribe()
```

### Authentication Flow

1. User clicks "Sign in with Google"
2. Redirects to `/auth/signin`
3. Supabase handles OAuth flow
4. Callback at `/auth/callback` exchanges code for session
5. User redirected to `/dashboard`

### RLS Policies

- Users can only SELECT their own profile
- Users can only SELECT their own bookmarks
- Users can only INSERT bookmarks with their own `user_id`
- Users can only DELETE their own bookmarks

## 🐛 Troubleshooting

### Realtime not working?

1. Ensure Realtime is enabled in Supabase Dashboard → Database → Replication
2. Check that the `bookmarks` table has replication enabled
3. Verify RLS policies allow SELECT operations

### OAuth redirect errors?

1. Verify redirect URLs match exactly in both Google Cloud Console and Supabase
2. Check that `NEXT_PUBLIC_SITE_URL` matches your deployment URL
3. Ensure HTTPS is used in production

### Type errors?

Run:
```bash
bun run build
# or
npm run build
```

## 📝 License

MIT

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Database powered by [Supabase](https://supabase.com/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Animations with [Motion](https://motion.dev/)

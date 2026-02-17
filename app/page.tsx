import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { Bookmark, Zap, Shield, Chrome, Gauge } from 'lucide-react'
import { SignInButton } from '@/components/SignInButton'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'SmartBookmark — Private, realtime bookmarks',
  description:
    'A modern bookmark manager with Google OAuth, strict Row Level Security, and realtime sync across tabs.',
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  const params = await searchParams
  const error = params?.error

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-16">
        <div className="container mx-auto max-w-4xl">
          {/* Hero Section */}
          <div className="mb-16 text-center">
            {/* Hero Icon */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-primary/30 via-primary/20 to-primary/30 blur-3xl" />
                <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-primary/80 to-primary/60 shadow-2xl">
                  <Bookmark className="h-12 w-12 text-primary-foreground" />
                </div>
              </div>
            </div>

            {/* Hero Text */}
            <h1 className="mb-4 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="bg-linear-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                SmartBookmark
              </span>
            </h1>
            <p className="mb-4 text-xl text-muted-foreground sm:text-2xl">
              Private, realtime bookmarks for focused teams and individuals.
            </p>
            <p className="mb-10 text-lg text-muted-foreground/80">
              Google OAuth • RLS-secured • Instant sync across tabs
            </p>

            {/* CTA Button */}
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <SignInButton />
              <Button asChild variant="outline" size="lg" className="h-12 rounded-xl px-7">
                <a href="#learn-more">Learn more</a>
              </Button>
            </div>

            {/* Login Status Indicator */}
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <div className="h-2 w-2 rounded-full bg-muted-foreground/50" />
              <span>Not signed in</span>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-4 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
                {decodeURIComponent(error)}
              </div>
            )}
          </div>

          {/* Features Grid */}
          <section id="learn-more" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="group rounded-xl border border-border bg-card p-6 text-left transition-all hover:border-primary/30 hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Real-time Sync</h3>
              <p className="text-sm text-muted-foreground">
                Changes sync instantly across all your devices and browser tabs. Never lose a bookmark again.
              </p>
            </div>

            <div className="group rounded-xl border border-border bg-card p-6 text-left transition-all hover:border-primary/30 hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/10">
                <Bookmark className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Organized</h3>
              <p className="text-sm text-muted-foreground">
                Keep all your bookmarks in one convenient place. Quick access to your favorite links.
              </p>
            </div>

            <div className="group rounded-xl border border-border bg-card p-6 text-left transition-all hover:border-primary/30 hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Secure</h3>
              <p className="text-sm text-muted-foreground">
                Your data is protected with enterprise-grade security. Only you can access your bookmarks.
              </p>
            </div>
            <div className="group rounded-xl border border-border bg-card p-6 text-left transition-all hover:border-primary/30 hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/10">
                <Chrome className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Google Auth</h3>
              <p className="text-sm text-muted-foreground">
                Sign in with Google only. No passwords to manage, no reset flows, no friction.
              </p>
            </div>
            <div className="group rounded-xl border border-border bg-card p-6 text-left transition-all hover:border-primary/30 hover:shadow-lg sm:col-span-2 lg:col-span-4">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/10">
                <Gauge className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Minimal & Fast</h3>
              <p className="text-sm text-muted-foreground">
                Server Components by default, client components only where needed, and state updates driven by realtime payloads (no full refetch).
              </p>
            </div>
          </section>

          {/* How It Works */}
          <div className="mt-16 rounded-2xl border border-border bg-card p-8">
            <h2 className="mb-6 text-center text-2xl font-bold">How It Works</h2>
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="text-center">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
                  1
                </div>
                <h3 className="mb-2 font-semibold">Sign In</h3>
                <p className="text-sm text-muted-foreground">
                  Sign in with your Google account. No password needed.
                </p>
              </div>
              <div className="text-center">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
                  2
                </div>
                <h3 className="mb-2 font-semibold">Add Bookmarks</h3>
                <p className="text-sm text-muted-foreground">
                  Add your favorite links with a title and URL.
                </p>
              </div>
              <div className="text-center">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
                  3
                </div>
                <h3 className="mb-2 font-semibold">Access Anywhere</h3>
                <p className="text-sm text-muted-foreground">
                  Your bookmarks sync instantly across all devices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

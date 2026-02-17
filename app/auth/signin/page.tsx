import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { SignInButton } from '@/components/SignInButton'

export const metadata: Metadata = {
  title: 'Sign in — SmartBookmark',
  description: 'Sign in with Google to access your bookmarks.',
}

export default async function SignInPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) redirect('/dashboard')

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-64px)] max-w-6xl items-center px-4 py-16 sm:px-6">
      <div className="w-full rounded-2xl border border-border bg-card p-8 shadow-sm md:p-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Sign in to SmartBookmark
        </h1>
        <p className="mt-3 max-w-xl text-sm text-muted-foreground">
          Google OAuth only. No passwords. Your bookmarks are protected by Row Level Security.
        </p>

        <div className="mt-8">
          <SignInButton />
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          By continuing you agree to our Terms and Privacy Policy (placeholders).
        </p>
      </div>
    </div>
  )
}

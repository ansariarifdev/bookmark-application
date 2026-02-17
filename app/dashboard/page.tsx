import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { DashboardClient } from '@/app/dashboard/_components/DashboardClient'
import type { Bookmark } from '@/components/bookmarks/types'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Dashboard — SmartBookmark',
  description: 'Manage your bookmarks with realtime sync and secure access.',
}

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/')
  }

  const { data: initialBookmarks } = await supabase
    .from('bookmarks')
    .select('id,user_id,title,url,created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <section className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          <span className="bg-linear-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            Dashboard
          </span>
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Signed in as <span className="font-medium text-foreground">{user.email}</span>
        </p>
      </section>

      <DashboardClient
        userId={user.id}
        initialBookmarks={(initialBookmarks ?? []) as Bookmark[]}
      />
    </div>
  )
}

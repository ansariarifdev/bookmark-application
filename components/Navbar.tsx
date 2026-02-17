'use client'

import { createClient } from '@/lib/supabase-client'
import { Button } from '@/components/ui/button'
import { LogOut, Bookmark, User, CheckCircle2 } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { animate } from 'motion/react'
import Link from 'next/link'

export function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    // Force a hard refresh to clear all state
    window.location.href = '/'
  }

  useEffect(() => {
    if (!loading) {
      animate(
        '.navbar-animate',
        { opacity: [0, 1], y: [-10, 0] },
        { duration: 0.5, delay: 0.1 }
      )
    }
  }, [loading])

  if (loading) {
    return (
      <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/60">
              <Bookmark className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold">Smart Bookmarks</span>
          </div>
        </div>
      </nav>
    )
  }

  const isDashboard = pathname === '/dashboard'

  return (
    <nav className="navbar-animate sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href={user ? '/dashboard' : '/'} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/60">
            <Bookmark className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Smart Bookmarks
          </span>
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              {/* Login Status Indicator */}
              <div className="hidden items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 sm:flex">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-medium text-muted-foreground">Signed in</span>
              </div>

              {/* User Email */}
              <div className="hidden items-center gap-2 sm:flex">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground max-w-[150px] truncate">
                  {user.email}
                </span>
              </div>

              {/* Dashboard Link */}
              {!isDashboard && (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="hidden sm:flex"
                >
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              )}

              {/* Sign Out Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="group relative overflow-hidden"
              >
                <LogOut className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </>
          ) : (
            <>
              {/* Not Signed In Indicator */}
              <div className="hidden items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 sm:flex">
                <div className="h-2 w-2 rounded-full bg-muted-foreground/50" />
                <span className="text-xs font-medium text-muted-foreground">Not signed in</span>
              </div>

              {/* Sign In Button */}
              <Button
                asChild
                size="sm"
                className="bg-gradient-to-r from-primary to-primary/80"
              >
                <Link href="/auth/signin">Sign In</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

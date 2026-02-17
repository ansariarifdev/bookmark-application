 import Link from 'next/link'
 import { createClient } from '@/lib/supabase-server'
 import { signOutAction } from '@/app/actions/auth'
 import { Bookmark, Menu, LogIn, LayoutDashboard, LogOut } from 'lucide-react'
 import { Button } from '@/components/ui/button'
 
 export async function Header() {
   const supabase = await createClient()
   const {
     data: { user },
   } = await supabase.auth.getUser()
 
   return (
     <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
       <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
         <Link href="/" className="flex items-center gap-2">
           <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-sm">
             <Bookmark className="h-4 w-4 text-primary-foreground" />
           </span>
           <span className="text-sm font-semibold tracking-tight sm:text-base">
             <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
               SmartBookmark
             </span>
           </span>
         </Link>
 
         {/* Desktop */}
         <div className="hidden items-center gap-2 md:flex">
           <Button asChild variant="ghost" size="sm">
             <Link href="/">Home</Link>
           </Button>
           <Button asChild variant="ghost" size="sm">
             <Link href="/dashboard">Dashboard</Link>
           </Button>
 
           <div className="mx-2 h-5 w-px bg-border" />
 
           {!user ? (
             <Button asChild size="sm" className="bg-gradient-to-r from-primary to-primary/80">
               <Link href="/auth/signin" className="flex items-center gap-2">
                 <LogIn className="h-4 w-4" />
                 Sign in
               </Link>
             </Button>
           ) : (
             <div className="flex items-center gap-2">
               <span className="max-w-[220px] truncate rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
                 {user.email}
               </span>
               <form action={signOutAction}>
                 <Button variant="outline" size="sm" className="flex items-center gap-2">
                   <LogOut className="h-4 w-4" />
                   Logout
                 </Button>
               </form>
             </div>
           )}
         </div>
 
         {/* Mobile (no client JS via <details>) */}
         <details className="group md:hidden">
           <summary className="list-none rounded-lg border border-border bg-card px-3 py-2 text-sm shadow-sm transition hover:shadow">
             <span className="flex items-center gap-2">
               <Menu className="h-4 w-4" />
               Menu
             </span>
           </summary>
           <div className="absolute left-0 right-0 top-16 border-b border-border/60 bg-background/95 px-4 py-4 shadow-md backdrop-blur supports-[backdrop-filter]:bg-background/70">
             <div className="mx-auto flex max-w-6xl flex-col gap-2">
               <Button asChild variant="ghost" className="justify-start">
                 <Link href="/">Home</Link>
               </Button>
               <Button asChild variant="ghost" className="justify-start">
                 <Link href="/dashboard" className="flex items-center gap-2">
                   <LayoutDashboard className="h-4 w-4" />
                   Dashboard
                 </Link>
               </Button>
 
               <div className="my-2 h-px w-full bg-border" />
 
               {!user ? (
                 <Button asChild className="justify-start bg-gradient-to-r from-primary to-primary/80">
                   <Link href="/auth/signin" className="flex items-center gap-2">
                     <LogIn className="h-4 w-4" />
                     Sign in with Google
                   </Link>
                 </Button>
               ) : (
                 <div className="flex flex-col gap-2">
                   <span className="truncate rounded-lg border border-border bg-card px-3 py-2 text-xs text-muted-foreground">
                     Signed in as {user.email}
                   </span>
                   <form action={signOutAction}>
                     <Button variant="outline" className="justify-start">
                       <span className="flex items-center gap-2">
                         <LogOut className="h-4 w-4" />
                         Logout
                       </span>
                     </Button>
                   </form>
                 </div>
               )}
             </div>
           </div>
         </details>
       </nav>
     </header>
   )
 }
 

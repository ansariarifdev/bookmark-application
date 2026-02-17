 'use client'
 
 import { ToastProvider, useToast } from '@/components/ui/toast'
 import { BookmarksProvider } from '@/components/bookmarks/bookmarks-context'
 import type { Bookmark } from '@/components/bookmarks/types'
 import { BookmarkForm } from '@/components/BookmarkForm'
 import { BookmarkList } from '@/components/BookmarkList'
 
 function DashboardInner({
   userId,
   initialBookmarks,
 }: {
   userId: string
   initialBookmarks: Bookmark[]
 }) {
   const { toast } = useToast()
 
   return (
     <BookmarksProvider userId={userId} initialBookmarks={initialBookmarks} onToast={toast}>
       <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
         <section aria-label="Add bookmark" className="lg:sticky lg:top-24 lg:self-start">
           <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
             <h2 className="text-lg font-semibold">Add a bookmark</h2>
             <p className="mt-1 text-sm text-muted-foreground">
               Save a link and it will sync instantly across your tabs.
             </p>
             <div className="mt-6">
               <BookmarkForm />
             </div>
           </div>
         </section>
 
         <section aria-label="Bookmarks list">
           <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
             <div className="flex items-center justify-between gap-4">
               <div>
                 <h2 className="text-lg font-semibold">Your bookmarks</h2>
                 <p className="mt-1 text-sm text-muted-foreground">
                   Realtime updates are enabled for your account.
                 </p>
               </div>
             </div>
 
             <div className="mt-6">
               <BookmarkList />
             </div>
           </div>
         </section>
       </div>
     </BookmarksProvider>
   )
 }
 
 export function DashboardClient(props: { userId: string; initialBookmarks: Bookmark[] }) {
   return (
     <ToastProvider>
       <DashboardInner {...props} />
     </ToastProvider>
   )
 }
 

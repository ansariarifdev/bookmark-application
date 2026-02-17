 'use client'
 
 import {
   createContext,
   useCallback,
   useContext,
   useEffect,
   useMemo,
   useRef,
   useState,
 } from 'react'
 import { createClient } from '@/lib/supabase-client'
 import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js'
 import type { Bookmark, BookmarkInsert } from '@/components/bookmarks/types'
 
 type BookmarksContextValue = {
   userId: string
   bookmarks: Bookmark[]
   isBootstrapped: boolean
   addBookmark: (input: BookmarkInsert) => Promise<void>
   deleteBookmark: (id: string) => Promise<void>
 }
 
 const BookmarksContext = createContext<BookmarksContextValue | null>(null)
 
 export function useBookmarks() {
   const ctx = useContext(BookmarksContext)
   if (!ctx) throw new Error('useBookmarks must be used within <BookmarksProvider />')
   return ctx
 }
 
 function normalizeUrl(raw: string) {
   try {
     const u = new URL(raw)
     return u.toString()
   } catch {
     return raw.trim()
   }
 }
 
 export function BookmarksProvider({
   userId,
   initialBookmarks,
   onToast,
   children,
 }: {
   userId: string
   initialBookmarks: Bookmark[]
   onToast: (input: { title: string; description?: string; variant?: 'success' | 'error' | 'info' }) => void
   children: React.ReactNode
 }) {
   const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks)
   const [isBootstrapped, setIsBootstrapped] = useState(false)
   const channelRef = useRef<ReturnType<ReturnType<typeof createClient>['channel']> | null>(
     null
   )
 
   // Bootstrap once (only if server didn't provide data, or to ensure session is ready).
   useEffect(() => {
     let cancelled = false
     const supabase = createClient()
 
     const bootstrap = async () => {
       // Ensure session exists (avoids race where UI renders but session cookie not applied yet)
       const { data } = await supabase.auth.getSession()
       if (cancelled) return
       if (!data.session?.user) {
         setIsBootstrapped(true)
         return
       }
 
       // If initial bookmarks were empty, fetch once.
       if (initialBookmarks.length === 0) {
         const { data: rows, error } = await supabase
           .from('bookmarks')
           .select('id,user_id,title,url,created_at')
           .eq('user_id', userId)
           .order('created_at', { ascending: false })
 
         if (!cancelled) {
           if (!error && rows) setBookmarks(rows as Bookmark[])
           setIsBootstrapped(true)
         }
       } else {
         setIsBootstrapped(true)
       }
     }
 
     bootstrap()
     return () => {
       cancelled = true
     }
     // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [userId])
 
   // Realtime: single subscription per user, no refetch.
   useEffect(() => {
     const supabase = createClient()
 
     // Prevent duplicate subscriptions
     if (channelRef.current) {
       supabase.removeChannel(channelRef.current)
       channelRef.current = null
     }
 
     const channel = supabase
       .channel(`bookmarks:${userId}`)
       .on<Bookmark>(
         'postgres_changes',
         {
           event: '*',
           schema: 'public',
           table: 'bookmarks',
           filter: `user_id=eq.${userId}`,
         },
         (payload: RealtimePostgresChangesPayload<Bookmark>) => {
           setBookmarks((prev) => {
             if (payload.eventType === 'INSERT') {
               // De-dupe (optimistic insert may already be replaced with real id)
               if (prev.some((b) => b.id === payload.new.id)) return prev
               return [payload.new as Bookmark, ...prev]
             }
             if (payload.eventType === 'DELETE') {
               const oldId = (payload.old as { id?: string }).id
               if (!oldId) return prev
               return prev.filter((b) => b.id !== oldId)
             }
             if (payload.eventType === 'UPDATE') {
               return prev.map((b) => (b.id === payload.new.id ? (payload.new as Bookmark) : b))
             }
             return prev
           })
         }
       )
       .subscribe()
 
     channelRef.current = channel
 
     return () => {
       supabase.removeChannel(channel)
       channelRef.current = null
     }
   }, [userId])
 
   const addBookmark = useCallback(
     async ({ title, url }: BookmarkInsert) => {
       const supabase = createClient()
       const now = new Date().toISOString()
       const tempId = `temp_${crypto.randomUUID()}`
 
       const optimistic: Bookmark = {
         id: tempId,
         user_id: userId,
         title: title.trim(),
         url: normalizeUrl(url),
         created_at: now,
       }
 
       setBookmarks((prev) => [optimistic, ...prev])
 
       const { data, error } = await supabase
         .from('bookmarks')
         .insert({
           user_id: userId,
           title: optimistic.title,
           url: optimistic.url,
         })
         .select('id,user_id,title,url,created_at')
         .single()
 
       if (error || !data) {
         // rollback
         setBookmarks((prev) => prev.filter((b) => b.id !== tempId))
         onToast({
           title: 'Could not add bookmark',
           description: error?.message ?? 'Please try again.',
           variant: 'error',
         })
         return
       }
 
       // Replace optimistic item with actual row (no waiting for realtime)
       setBookmarks((prev) =>
         prev.map((b) => (b.id === tempId ? (data as Bookmark) : b))
       )
 
       onToast({ title: 'Bookmark added', variant: 'success' })
     },
     [onToast, userId]
   )
 
   const deleteBookmark = useCallback(
     async (id: string) => {
       const supabase = createClient()
       let snapshot: Bookmark | null = null
 
       setBookmarks((prev) => {
         snapshot = prev.find((b) => b.id === id) ?? null
         return prev.filter((b) => b.id !== id)
       })
 
       const { error } = await supabase.from('bookmarks').delete().eq('id', id)
       if (error) {
         if (snapshot) setBookmarks((prev) => [snapshot!, ...prev])
         onToast({
           title: 'Could not delete bookmark',
           description: error.message,
           variant: 'error',
         })
         return
       }
 
       onToast({ title: 'Bookmark deleted', variant: 'success' })
     },
     [onToast]
   )
 
   const value = useMemo<BookmarksContextValue>(
     () => ({ userId, bookmarks, isBootstrapped, addBookmark, deleteBookmark }),
     [userId, bookmarks, isBootstrapped, addBookmark, deleteBookmark]
   )
 
   return <BookmarksContext.Provider value={value}>{children}</BookmarksContext.Provider>
 }
 

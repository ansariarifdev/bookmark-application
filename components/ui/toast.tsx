 'use client'
 
 import { createContext, useCallback, useContext, useMemo, useState } from 'react'
 import { X } from 'lucide-react'
 import { cn } from '@/lib/utils'
 
 type ToastVariant = 'success' | 'error' | 'info'
 
 export type ToastInput = {
   title: string
   description?: string
   variant?: ToastVariant
 }
 
 type Toast = ToastInput & {
   id: string
 }
 
 type ToastContextValue = {
   toast: (input: ToastInput) => void
 }
 
 const ToastContext = createContext<ToastContextValue | null>(null)
 
 export function useToast() {
   const ctx = useContext(ToastContext)
   if (!ctx) throw new Error('useToast must be used within <ToastProvider />')
   return ctx
 }
 
 export function ToastProvider({ children }: { children: React.ReactNode }) {
   const [toasts, setToasts] = useState<Toast[]>([])
 
   const remove = useCallback((id: string) => {
     setToasts((prev) => prev.filter((t) => t.id !== id))
   }, [])
 
   const toast = useCallback(
     (input: ToastInput) => {
       const id = crypto.randomUUID()
       const t: Toast = { id, variant: 'info', ...input }
       setToasts((prev) => [t, ...prev].slice(0, 4))
       setTimeout(() => remove(id), 3500)
     },
     [remove]
   )
 
   const value = useMemo(() => ({ toast }), [toast])
 
   return (
     <ToastContext.Provider value={value}>
       {children}
       <div
         aria-live="polite"
         aria-relevant="additions removals"
         className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-2 px-4 sm:px-0"
       >
         {toasts.map((t) => (
           <div
             key={t.id}
             data-toast-id={t.id}
             className={cn(
              'pointer-events-auto rounded-xl border bg-card p-4 shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-200',
               t.variant === 'success' && 'border-primary/30',
               t.variant === 'error' && 'border-destructive/40'
             )}
           >
             <div className="flex items-start justify-between gap-3">
               <div className="min-w-0">
                 <p className="text-sm font-semibold">{t.title}</p>
                 {t.description ? (
                   <p className="mt-1 text-sm text-muted-foreground">{t.description}</p>
                 ) : null}
               </div>
               <button
                 type="button"
                 onClick={() => remove(t.id)}
                 className="rounded-md p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                 aria-label="Dismiss notification"
               >
                 <X className="h-4 w-4" />
               </button>
             </div>
           </div>
         ))}
       </div>
     </ToastContext.Provider>
   )
 }
 

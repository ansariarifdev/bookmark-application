'use client'

import { Button } from '@/components/ui/button'
import { Trash2, ExternalLink, Bookmark } from 'lucide-react'
import { animate } from 'motion/react'
import { useState } from 'react'
import { useBookmarks } from '@/components/bookmarks/bookmarks-context'

export function BookmarkList() {
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [confirmingId, setConfirmingId] = useState<string | null>(null)
  const { bookmarks, isBootstrapped, deleteBookmark } = useBookmarks()

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    // Animate deletion container immediately for snappy UX
    animate(
      `[data-bookmark-id="${id}"]`,
      { opacity: [1, 0.4], scale: [1, 0.985] },
      { duration: 0.15 }
    )
    await deleteBookmark(id)
    setDeletingId(null)
  }

  if (!isBootstrapped) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Preparing your workspace...</p>
        </div>
      </div>
    )
  }

  if (bookmarks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <Bookmark className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="mb-2 text-lg font-semibold">No bookmarks yet</h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          Start building your collection by adding your first bookmark above!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {bookmarks.map((bookmark) => (
        <div
          key={bookmark.id}
          data-bookmark-id={bookmark.id}
          className="group relative rounded-lg border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md hover:border-primary/20"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="mb-1 font-semibold text-foreground line-clamp-1">
                {bookmark.title}
              </h3>
              <a
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <span className="truncate">{bookmark.url}</span>
                <ExternalLink className="h-3 w-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
              <p className="mt-2 text-xs text-muted-foreground">
                {new Date(bookmark.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setConfirmingId(bookmark.id)}
              disabled={deletingId === bookmark.id}
              className="shrink-0 text-destructive opacity-0 transition-all hover:bg-destructive/10 group-hover:opacity-100"
              aria-label={`Delete ${bookmark.title}`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}

      {/* Confirm dialog (simple, accessible) */}
      {confirmingId && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Confirm delete bookmark"
          className="fixed inset-0 z-90 flex items-center justify-center bg-black/40 px-4"
          onClick={() => setConfirmingId(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-border bg-background p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-base font-semibold">Delete bookmark?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              This action can’t be undone.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <Button
                variant="outline"
                onClick={() => setConfirmingId(null)}
                className="sm:order-1"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={async () => {
                  const id = confirmingId
                  setConfirmingId(null)
                  await handleDelete(id)
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

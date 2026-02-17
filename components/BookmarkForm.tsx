'use client'

import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Loader2 } from 'lucide-react'
import { animate } from 'motion/react'
import { useBookmarks } from '@/components/bookmarks/bookmarks-context'

export function BookmarkForm() {
  const { addBookmark } = useBookmarks()
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!title.trim() || !url.trim()) {
      setError('Please fill in both title and URL')
      return
    }

    // Basic URL validation
    try {
      new URL(url)
    } catch {
      setError('Please enter a valid URL')
      return
    }

    startTransition(async () => {
      await addBookmark({ title, url })

      // Reset form
      setTitle('')
      setUrl('')
      
      // Animate success
      animate(
        '.form-success',
        { scale: [1, 1.05, 1], opacity: [1, 0.8, 1] },
        { duration: 0.3 }
      )
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="form-success space-y-4 rounded-lg border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md"
    >
      <div className="space-y-2">
        <label
          htmlFor="title"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Title
        </label>
        <Input
          id="title"
          type="text"
          placeholder="My Awesome Bookmark"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isPending}
          className="transition-all focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="url"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          URL
        </label>
        <Input
          id="url"
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={isPending}
          className="transition-all focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {error && (
        <div
          className="rounded-md bg-destructive/10 p-3 text-sm text-destructive"
          role="alert"
        >
          {error}
        </div>
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="w-full bg-linear-to-r from-primary to-primary/80 transition-all hover:from-primary/90 hover:to-primary/70"
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Adding...
          </>
        ) : (
          <>
            <Plus className="mr-2 h-4 w-4" />
            Add Bookmark
          </>
        )}
      </Button>
    </form>
  )
}

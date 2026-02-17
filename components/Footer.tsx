import Link from "next/link";
import { Bookmark, Shield, Zap, Chrome } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-primary to-primary/70 shadow-sm">
              <Bookmark className="h-4 w-4 text-primary-foreground" />
            </span>
            <span className="text-sm font-semibold tracking-tight sm:text-base">
              SmartBookmark
            </span>
          </div>
          <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
            A minimal, secure, real-time bookmark manager. Google OAuth-only
            sign-in and strict Row Level Security so only you can see your data.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-muted-foreground sm:grid-cols-3">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              Private by default
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              Realtime sync
            </div>
            <div className="flex items-center gap-2">
              <Chrome className="h-4 w-4 text-primary" />
              Google sign-in
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Product</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link className="hover:text-foreground" href="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:text-foreground" href="/dashboard">
                Dashboard
              </Link>
            </li>
            <li>
              <a
                className="hover:text-foreground"
                href="https://github.com/ansariarifdev/bookmark-application"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Legal</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <a className="hover:text-foreground" href="#">
                Privacy Policy
              </a>
            </li>
            <li>
              <a className="hover:text-foreground" href="#">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} SmartBookmark. All rights reserved.
          </p>
          <p>Built with Next.js + Supabase. Deployed on Vercel.</p>
        </div>
      </div>
    </footer>
  );
}

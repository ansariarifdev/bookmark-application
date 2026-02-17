import { SignInButton } from "@/components/SignInButton";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

export function SignInCard() {
  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border/50 bg-background/60 shadow-xl backdrop-blur-xl supports-backdrop-filter:bg-background/40">
      {/* Decorative gradient blob */}
      <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />

      <div className="relative p-8 md:p-10">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to access your synchronized bookmarks
          </p>
        </div>

        <div className="space-y-6">
          <SignInButton className="w-full" />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Secure Authentication
              </span>
            </div>
          </div>

          <div className="grid gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>No password required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>Instant Google OAuth login</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>Row Level Security protected</span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-muted-foreground">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </div>
      </div>
    </div>
  );
}

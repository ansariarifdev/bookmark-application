import { SignInCard } from "@/components/auth/SignInCard";
import { ArrowRight, Check } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-10 pb-20 lg:pb-32 lg:pt-20">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left Content */}
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
              v1.0 Now Public Audit
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-linear-to-r from-foreground to-foreground/60 bg-clip-text text-transparent pb-2">
              Organize Your Digital World
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
              A modern bookmark manager built for focus, productivity, and
              simplicity. Save links instantly, sync across devices, and keep
              your reading list private.
            </p>

            <div className="flex flex-col sm:flex-row items-start justify-center lg:justify-start gap-4 text-sm text-foreground/80">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Check className="h-4 w-4" />
                </div>
                Free Forever
              </div>
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Check className="h-4 w-4" />
                </div>
                Open Source
              </div>
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Check className="h-4 w-4" />
                </div>
                Secure
              </div>
            </div>
          </div>

          {/* Right Content - Sign In Card */}
          <div className="w-full max-w-md lg:w-1/2 flex justify-center lg:justify-end">
            <SignInCard />
          </div>
        </div>
      </div>
    </section>
  );
}

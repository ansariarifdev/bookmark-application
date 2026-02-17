import Link from "next/link";
import { Github, Star, ArrowUpRight } from "lucide-react";

export function GitHubCTA() {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-linear-to-br from-card to-card/50 p-8 md:p-12 lg:p-16 text-center shadow-lg">
        {/* Background glow effects */}
        <div className="absolute -top-1/2 left-1/2 h-full w-full -translate-x-1/2 bg-primary/5 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Github className="h-4 w-4" />
            <span>Open Source</span>
          </div>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl max-w-3xl">
            Clean code. Production ready.
            <br />
            <span className="bg-linear-to-r from-foreground to-foreground/50 bg-clip-text text-transparent">
              Open for contributions.
            </span>
          </h2>

          <p className="max-w-xl text-lg text-muted-foreground">
            Explore the source code, contribute to the project, or fork it to
            build your own. Built with modern technologies for modern
            developers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link
              href="https://github.com/ansariarifdev/bookmark-application"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-8 text-sm font-medium text-background transition-all hover:bg-foreground/90 hover:scale-105 hover:shadow-lg gap-2"
            >
              <Star className="h-4 w-4" />
              Star on GitHub
            </Link>

            <Link
              href="https://github.com/ansariarifdev/bookmark-application/fork"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-background px-8 text-sm font-medium transition-all hover:bg-muted hover:scale-105 hover:border-foreground/20 gap-2"
            >
              View Source
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

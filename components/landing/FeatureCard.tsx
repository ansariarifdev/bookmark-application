import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  className,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border/50 bg-background/50 p-6 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md hover:border-primary/20",
        className,
      )}
    >
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10 flex flex-col gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/20 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]">
          <Icon className="h-6 w-6 stroke-[1.5]" />
        </div>

        <h3 className="text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
          {title}
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

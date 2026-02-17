import { FeatureCard } from "./FeatureCard";
import {
  Bookmark,
  Lock,
  Zap,
  Smartphone,
  Search,
  RefreshCw,
  LucideIcon,
} from "lucide-react";

const features: Array<{
  icon: LucideIcon;
  title: string;
  description: string;
}> = [
  {
    icon: Bookmark,
    title: "Instant Saves",
    description:
      "Save web pages instantly with a single click. Never lose a valuable resource again.",
  },
  {
    icon: Lock,
    title: "Secure Auth",
    description:
      "Enterprise-grade security with Google OAuth and Row Level Security protection.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Built on Next.js 16 and Supabase for instantaneous load times and updates.",
  },
  {
    icon: Smartphone,
    title: "Fully Responsive",
    description:
      "Access your bookmarks seamlessly across desktop, tablet, and mobile devices.",
  },
  {
    icon: Search,
    title: "Smart Search",
    description:
      "Find any bookmark instantly with our powerful, real-time search engine.",
  },
  {
    icon: RefreshCw,
    title: "Always in Sync",
    description:
      "Your data stays synchronized across all your devices automatically.",
  },
];

export function FeaturesGrid() {
  return (
    <section className="container mx-auto px-4 py-20 lg:py-32">
      <div className="mx-auto max-w-2xl text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Everything You Need
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Powerful features to help you organize your digital life efficiently.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            className="h-full"
          />
        ))}
      </div>
    </section>
  );
}

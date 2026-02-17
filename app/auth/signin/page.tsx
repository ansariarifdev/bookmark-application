import type { Metadata } from "next";
import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesGrid } from "@/components/landing/FeaturesGrid";
import { GitHubCTA } from "@/components/landing/GitHubCTA";

export const metadata: Metadata = {
  title: "Sign in — SmartBookmark",
  description: "Sign in with Google to access your bookmarks.",
};

export default async function SignInPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect("/dashboard");

  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary/10 selection:text-primary">
      <main className="flex-1">
        <HeroSection />
        <FeaturesGrid />
        <GitHubCTA />
      </main>
    </div>
  );
}

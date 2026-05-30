import { ScrollAwareFooter } from "@/components/layout/ScrollAwareFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { getCurrentProfile } from "@/lib/auth";
import { getAllArticleSummaries } from "@/lib/wiki";
import { getSupabasePublicConfig } from "@/lib/supabase/config";

export async function WikiShell({ children }: { children: React.ReactNode }) {
  const [articles, initialProfile, authConfig] = await Promise.all([
    Promise.resolve(getAllArticleSummaries()),
    getCurrentProfile(),
    Promise.resolve(getSupabasePublicConfig()),
  ]);

  return (
    <div className="site-shell relative z-[1] flex min-h-screen flex-col">
      <SiteHeader
        articles={articles}
        initialProfile={initialProfile}
        authConfig={authConfig}
      />
      <main className="flex-1">{children}</main>
      <ScrollAwareFooter />
    </div>
  );
}

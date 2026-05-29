import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { getCurrentProfile } from "@/lib/auth";
import { getAllArticleSummaries } from "@/lib/wiki";

export async function WikiShell({ children }: { children: React.ReactNode }) {
  const [articles, initialProfile] = await Promise.all([
    Promise.resolve(getAllArticleSummaries()),
    getCurrentProfile(),
  ]);

  return (
    <div className="site-shell relative z-[1] flex min-h-screen flex-col">
      <SiteHeader articles={articles} initialProfile={initialProfile} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

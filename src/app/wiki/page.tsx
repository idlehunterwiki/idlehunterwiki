import type { Metadata } from "next";
import { ArticleCard } from "@/components/wiki/ArticleCard";
import { WikiSidebar } from "@/components/wiki/WikiSidebar";
import { Breadcrumbs } from "@/components/wiki/Breadcrumbs";
import { getAllArticleSummaries } from "@/lib/wiki";

export const metadata: Metadata = {
  title: "Articles",
  description: "All Idle Hunter wiki articles.",
};

export default function WikiIndexPage() {
  const articles = getAllArticleSummaries();

  return (
    <div className="mx-auto max-w-[90rem] px-4 py-8 sm:px-6 sm:py-10">
      <Breadcrumbs />
      <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-6">
        <WikiSidebar />
        <div>
          <h1 className="font-display text-2xl font-bold text-zinc-100">Articles</h1>
          <p className="mt-1 text-sm text-muted">{articles.length} articles</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { HomeFeaturedCategories } from "@/components/home/HomeFeaturedCategories";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeWikiStats } from "@/components/home/HomeWikiStats";
import { WIKI_CATEGORIES } from "@/lib/categories";
import { getAllArticleSummaries, getRecentArticles } from "@/lib/wiki";

export default function HomePage() {
  const totalArticles = getAllArticleSummaries().length;
  const recent = getRecentArticles(5);

  return (
    <div className="home-page min-h-[calc(100vh-4.5rem)]">
      <HomeHero totalArticles={totalArticles} />

      <div className="mx-auto max-w-[90rem] px-4 pb-24 pt-2 sm:px-8 sm:pb-28 sm:pt-3 lg:px-10">
        <HomeFeaturedCategories />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <section className="lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="game-section-title">Latest updates</h2>
              <Link href="/updates" className="text-xs text-muted hover:text-amber">
                All updates →
              </Link>
            </div>
            <div className="game-panel divide-y divide-border">
              {recent.map((article) => (
                <Link
                  key={article.slug}
                  href={`/wiki/${article.slug}`}
                  className="group flex gap-4 px-4 py-4 transition-colors hover:bg-panel-hover"
                >
                  <div className="min-w-0 flex-1">
                    {article.updatedAt && (
                      <time className="text-xs font-medium text-success">
                        {article.updatedAt}
                      </time>
                    )}
                    <h3 className="mt-1 font-medium text-zinc-200 group-hover:text-amber">
                      {article.title}
                    </h3>
                    <p className="mt-1 text-sm text-zinc-500 line-clamp-2">
                      {article.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <HomeWikiStats
            articleCount={totalArticles}
            categoryCount={WIKI_CATEGORIES.length}
          />
        </div>
      </div>
    </div>
  );
}

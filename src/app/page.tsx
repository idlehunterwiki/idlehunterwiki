import Link from "next/link";
import { HomeHero } from "@/components/home/HomeHero";
import { CategoryTile } from "@/components/home/CategoryTile";
import { ArticleQuickCard } from "@/components/home/ArticleQuickCard";
import { WIKI_CATEGORIES, getCategoryMeta } from "@/lib/categories";
import {
  getAllArticleSummaries,
  getFeaturedArticles,
  getRecentArticles,
  getSpotlightArticle,
} from "@/lib/wiki";

export default function HomePage() {
  const totalArticles = getAllArticleSummaries().length;
  const featured = getFeaturedArticles(6);
  const recent = getRecentArticles(5);
  const spotlight = getSpotlightArticle();
  const spotlightCat = spotlight ? getCategoryMeta(spotlight.category) : null;

  return (
    <div className="min-h-full">
      <HomeHero totalArticles={totalArticles} />

      <div className="mx-auto max-w-[90rem] px-4 py-8 sm:px-8 sm:py-10 lg:px-10">
        <section>
          <h2 className="game-section-title mb-4">Explore</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:gap-4">
            {WIKI_CATEGORIES.map((cat) => (
              <CategoryTile key={cat.id} category={cat} />
            ))}
          </div>
        </section>

        {featured.length > 0 && (
          <section className="mt-10">
            <h2 className="game-section-title mb-4">Popular right now</h2>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((article) => (
                <ArticleQuickCard key={article.slug} article={article} />
              ))}
            </div>
          </section>
        )}

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <section className="lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="game-section-title">Latest updates</h2>
              <Link href="/wiki" className="text-xs text-muted hover:text-amber">
                All articles →
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

          {spotlight && spotlightCat && (
            <section>
              <h2 className="game-section-title mb-4">Featured</h2>
              <Link
                href={`/wiki/${spotlight.slug}`}
                className={`game-panel group relative flex min-h-[280px] flex-col overflow-hidden bg-gradient-to-br ${spotlightCat.gradient} transition-all duration-300 hover:border-amber/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]`}
              >
                <span
                  aria-hidden
                  className="absolute right-2 top-2 font-display text-7xl text-white/[0.05]"
                >
                  {spotlightCat.symbol}
                </span>
                <div className="category-tile-footer mt-auto p-5">
                  <span className="text-xs font-medium uppercase tracking-wide text-amber">
                    {spotlightCat.label}
                  </span>
                  <h3 className="mt-2 font-display text-xl font-semibold text-zinc-50">
                    {spotlight.title}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-400 line-clamp-3">
                    {spotlight.description}
                  </p>
                  <span className="mt-4 inline-block text-sm font-medium text-amber opacity-0 transition-opacity group-hover:opacity-100">
                    Read more →
                  </span>
                </div>
              </Link>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

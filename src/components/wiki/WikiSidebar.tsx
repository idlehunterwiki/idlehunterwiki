import Link from "next/link";
import { WIKI_CATEGORIES } from "@/lib/categories";
import { getArticlesByCategory } from "@/lib/wiki";
import type { WikiCategory } from "@/types/wiki";

interface WikiSidebarProps {
  activeCategory?: WikiCategory;
  activeSlug?: string;
}

export function WikiSidebar({ activeCategory, activeSlug }: WikiSidebarProps) {
  return (
    <aside className="game-panel p-4 text-sm lg:sticky lg:top-20 lg:self-start">
      <nav aria-label="Categories" className="space-y-4">
        <div>
          <h2 className="game-section-title mb-2">Categories</h2>
          <ul className="space-y-0.5">
            {WIKI_CATEGORIES.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`/category/${cat.id}`}
                  className={
                    activeCategory === cat.id
                      ? "block rounded-md bg-zinc-800 px-2 py-1.5 text-amber"
                      : "block rounded-md px-2 py-1.5 text-muted hover:bg-panel-hover hover:text-zinc-200"
                  }
                >
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {activeCategory && (
          <div>
            <h2 className="game-section-title mb-2">In this category</h2>
            <ul className="space-y-0.5">
              {getArticlesByCategory(activeCategory).map((article) => (
                <li key={article.slug}>
                  <Link
                    href={`/wiki/${article.slug}`}
                    className={
                      activeSlug === article.slug
                        ? "block rounded-md bg-zinc-800 px-2 py-1.5 text-zinc-100"
                        : "block rounded-md px-2 py-1.5 text-muted hover:bg-panel-hover hover:text-zinc-200"
                    }
                  >
                    {article.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </aside>
  );
}

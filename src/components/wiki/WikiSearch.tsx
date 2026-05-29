"use client";

import Link from "next/link";
import { useArticleSearch } from "@/components/wiki/useArticleSearch";
import type { WikiArticleSummary } from "@/types/wiki";

interface WikiSearchProps {
  articles: WikiArticleSummary[];
  autoFocus?: boolean;
}

export function WikiSearch({ articles, autoFocus = false }: WikiSearchProps) {
  const { query, setQuery, results } = useArticleSearch(articles);

  return (
    <div>
      <label htmlFor="wiki-search" className="sr-only">
        Search
      </label>
      <input
        id="wiki-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search articles..."
        autoFocus={autoFocus}
        className="w-full rounded-lg border border-border bg-zinc-950 px-4 py-2.5 text-zinc-100 placeholder:text-zinc-600 focus:border-amber/50 focus:outline-none focus:ring-1 focus:ring-amber/30"
      />

      {query.trim().length >= 2 && (
        <ul className="mt-3 game-panel divide-y divide-border overflow-hidden">
          {results.length === 0 ? (
            <li className="px-4 py-5 text-sm text-muted">No results found.</li>
          ) : (
            results.map((article) => (
              <li key={article.slug}>
                <Link
                  href={`/wiki/${article.slug}`}
                  className="block px-4 py-3 hover:bg-panel-hover"
                >
                  <span className="font-medium text-zinc-200">{article.title}</span>
                  <span className="mt-0.5 block text-sm text-muted line-clamp-1">
                    {article.description}
                  </span>
                </Link>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

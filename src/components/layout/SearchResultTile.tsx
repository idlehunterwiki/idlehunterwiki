import Link from "next/link";
import { getCategoryMeta } from "@/lib/categories";
import type { WikiArticleSummary } from "@/types/wiki";

interface SearchResultTileProps {
  article: WikiArticleSummary;
  onSelect: () => void;
}

export function SearchResultTile({ article, onSelect }: SearchResultTileProps) {
  const cat = getCategoryMeta(article.category);

  return (
    <Link
      href={`/wiki/${article.slug}`}
      onClick={onSelect}
      className="search-result-tile game-panel flex w-full max-w-md items-center gap-2.5 rounded-lg border border-border p-2.5 no-underline transition-[border-color,box-shadow] duration-200 active:scale-[0.99]"
    >
      <span
        aria-hidden
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border/60 bg-gradient-to-br ${cat.gradient} text-sm text-zinc-300`}
      >
        {cat.symbol}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-zinc-100">
          {article.title}
        </p>
        <p className="mt-0.5 line-clamp-1 text-xs text-zinc-500">
          {article.description}
        </p>
      </div>
    </Link>
  );
}

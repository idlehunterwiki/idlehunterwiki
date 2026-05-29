import Link from "next/link";
import { getCategoryMeta } from "@/lib/categories";
import type { WikiArticleSummary } from "@/types/wiki";

export function ArticleQuickCard({ article }: { article: WikiArticleSummary }) {
  const cat = getCategoryMeta(article.category);

  return (
    <Link
      href={`/wiki/${article.slug}`}
      className="game-panel group flex items-center gap-3 p-3 transition-all duration-200 hover:border-amber/30 hover:bg-panel-hover active:scale-[0.99]"
    >
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${cat.gradient} text-lg text-zinc-400`}
        aria-hidden
      >
        {cat.symbol}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-zinc-200 group-hover:text-amber">
          {article.title}
        </p>
        <p className="truncate text-xs text-zinc-500">{cat.label}</p>
      </div>
      {article.updatedAt && (
        <span className="shrink-0 text-[10px] font-medium uppercase tracking-wide text-success">
          {article.updatedAt}
        </span>
      )}
    </Link>
  );
}

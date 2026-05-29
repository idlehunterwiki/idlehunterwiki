import Link from "next/link";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import type { WikiArticleSummary } from "@/types/wiki";

interface ArticleCardProps {
  article: WikiArticleSummary;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link
      href={`/wiki/${article.slug}`}
      className="game-panel group block p-5 transition-colors hover:border-amber/30 hover:bg-panel-hover"
    >
      <CategoryBadge category={article.category} linked={false} />
      <h3 className="mt-2 font-display text-lg font-semibold text-zinc-100 group-hover:text-amber">
        {article.title}
      </h3>
      <p className="mt-1.5 text-sm text-muted line-clamp-2">
        {article.description}
      </p>
    </Link>
  );
}

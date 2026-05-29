import Link from "next/link";
import { getCategoryMeta } from "@/lib/categories";
import type { WikiCategory } from "@/types/wiki";

interface CategoryBadgeProps {
  category: WikiCategory;
  linked?: boolean;
}

export function CategoryBadge({ category, linked = true }: CategoryBadgeProps) {
  const meta = getCategoryMeta(category);
  const className =
    "inline-block rounded-md bg-zinc-800 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-zinc-400 hover:text-zinc-200";

  if (linked) {
    return (
      <Link href={`/category/${category}`} className={className}>
        {meta.label}
      </Link>
    );
  }

  return <span className={className}>{meta.label}</span>;
}

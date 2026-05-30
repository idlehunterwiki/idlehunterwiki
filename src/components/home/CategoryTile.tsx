"use client";

import Link from "next/link";
import type { CategoryMeta } from "@/lib/categories";

export function CategoryTile({ category }: { category: CategoryMeta }) {
  return (
    <Link
      href={`/category/${category.id}`}
      className={`home-category-tile group relative flex min-h-[3.25rem] items-center gap-2 overflow-hidden rounded-lg border border-border bg-gradient-to-br px-2.5 py-2 no-underline transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-px hover:border-amber/40 hover:shadow-[0_0_16px_rgba(245,158,11,0.12)] active:scale-[0.99] ${category.gradient}`}
    >
      <span
        aria-hidden
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border/50 bg-black/20 text-xs text-zinc-300"
      >
        {category.symbol}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-xs font-semibold leading-tight text-zinc-100 group-hover:text-amber sm:text-sm">
          {category.label}
        </span>
      </span>
    </Link>
  );
}

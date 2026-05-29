"use client";

import Link from "next/link";
import type { CategoryMeta } from "@/lib/categories";

export function CategoryTile({ category }: { category: CategoryMeta }) {
  return (
    <Link
      href={`/category/${category.id}`}
      className={`group relative flex aspect-[5/3] overflow-hidden rounded-xl border border-border bg-gradient-to-br ${category.gradient} transition-all duration-300 hover:-translate-y-0.5 hover:border-amber/40 hover:shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_24px_rgba(245,158,11,0.12)] active:scale-[0.99]`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-2 -top-4 font-display text-[5rem] leading-none text-white/[0.04] transition-transform duration-300 group-hover:scale-110"
      >
        {category.symbol}
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(245,158,11,0.08),transparent_55%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="category-tile-footer absolute inset-x-0 bottom-0 px-4 py-3">
        <h3 className="font-display text-lg font-semibold tracking-wide text-zinc-50 drop-shadow-sm">
          {category.label}
        </h3>
        <p className="mt-0.5 text-xs text-zinc-400 line-clamp-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          {category.description}
        </p>
      </div>
    </Link>
  );
}

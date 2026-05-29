import Link from "next/link";
import { getCategoryMeta } from "@/lib/categories";
import type { WikiCategory } from "@/types/wiki";

interface BreadcrumbsProps {
  category?: WikiCategory;
  title?: string;
}

export function Breadcrumbs({ category, title }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-zinc-500">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <li>
          <Link href="/" className="hover:text-zinc-300">
            Home
          </Link>
        </li>
        <li aria-hidden className="text-zinc-700">
          /
        </li>
        <li>
          <Link href="/wiki" className="hover:text-zinc-300">
            Articles
          </Link>
        </li>
        {category && (
          <>
            <li aria-hidden className="text-zinc-700">
              /
            </li>
            <li>
              <Link href={`/category/${category}`} className="hover:text-zinc-300">
                {getCategoryMeta(category).label}
              </Link>
            </li>
          </>
        )}
        {title && (
          <>
            <li aria-hidden className="text-zinc-700">
              /
            </li>
            <li className="text-zinc-400 truncate max-w-[14rem] sm:max-w-none">
              {title}
            </li>
          </>
        )}
      </ol>
    </nav>
  );
}

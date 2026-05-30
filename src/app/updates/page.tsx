import type { Metadata } from "next";
import Link from "next/link";
import { getAllUpdates } from "@/lib/wiki";

export const metadata: Metadata = {
  title: "Updates",
  description: "All recent wiki article updates for Idle Hunter.",
};

export default function UpdatesPage() {
  const updates = getAllUpdates();

  return (
    <div className="mx-auto max-w-[90rem] px-4 py-8 sm:px-8 sm:py-10 lg:px-10">
      <h1 className="font-display text-2xl font-bold text-zinc-100">Updates</h1>
      <p className="mt-1 text-sm text-muted">
        All wiki articles sorted by last update.
      </p>

      <div className="game-panel mt-6 divide-y divide-border">
        {updates.map((article) => (
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
              <h2 className="mt-1 font-medium text-zinc-200 group-hover:text-amber">
                {article.title}
              </h2>
              <p className="mt-1 text-sm text-zinc-500 line-clamp-2">
                {article.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

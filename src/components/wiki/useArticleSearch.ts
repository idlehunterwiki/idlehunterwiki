"use client";

import Fuse from "fuse.js";
import { useMemo, useState } from "react";
import type { WikiArticleSummary } from "@/types/wiki";

export function useArticleSearch(articles: WikiArticleSummary[]) {
  const [query, setQuery] = useState("");

  const fuse = useMemo(
    () =>
      new Fuse(articles, {
        keys: [
          { name: "title", weight: 0.45 },
          { name: "description", weight: 0.3 },
          { name: "tags", weight: 0.25 },
        ],
        threshold: 0.4,
      }),
    [articles],
  );

  const results =
    query.trim().length < 2
      ? []
      : fuse.search(query.trim()).slice(0, 12).map((r) => r.item);

  return { query, setQuery, results };
}

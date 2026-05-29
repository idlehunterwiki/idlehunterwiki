"use client";

import { useEffect, useRef, useState } from "react";
import type { WikiArticleSummary } from "@/types/wiki";

export const SEARCH_RESULT_EXIT_MS = 300;

type ItemState = "enter" | "stable" | "exit";

export interface DisplaySearchItem {
  article: WikiArticleSummary;
  state: ItemState;
}

export function useAnimatedSearchResults(results: WikiArticleSummary[]) {
  const [items, setItems] = useState<DisplaySearchItem[]>([]);
  const exitTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  useEffect(() => {
    const nextBySlug = new Map(results.map((r) => [r.slug, r]));

    setItems((prev) => {
      const next: DisplaySearchItem[] = [];
      const slugsPlaced = new Set<string>();

      for (const item of prev) {
        const slug = item.article.slug;

        if (nextBySlug.has(slug)) {
          slugsPlaced.add(slug);
          next.push({
            article: nextBySlug.get(slug)!,
            state: item.state === "exit" ? "enter" : "stable",
          });
          continue;
        }

        if (item.state !== "exit") {
          slugsPlaced.add(slug);
          next.push({ article: item.article, state: "exit" });
          continue;
        }

        slugsPlaced.add(slug);
        next.push(item);
      }

      for (const article of results) {
        if (!slugsPlaced.has(article.slug)) {
          next.push({ article, state: "enter" });
        }
      }

      return next;
    });
  }, [results]);

  useEffect(() => {
    for (const item of items) {
      if (item.state !== "exit") {
        const pending = exitTimers.current.get(item.article.slug);
        if (pending) {
          clearTimeout(pending);
          exitTimers.current.delete(item.article.slug);
        }
        continue;
      }

      const slug = item.article.slug;
      if (exitTimers.current.has(slug)) continue;

      const timer = setTimeout(() => {
        setItems((prev) => prev.filter((i) => i.article.slug !== slug));
        exitTimers.current.delete(slug);
      }, SEARCH_RESULT_EXIT_MS);

      exitTimers.current.set(slug, timer);
    }
  }, [items]);

  useEffect(() => {
    return () => {
      exitTimers.current.forEach((timer) => clearTimeout(timer));
      exitTimers.current.clear();
    };
  }, []);

  return items;
}

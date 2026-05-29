"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { SearchResultTile } from "@/components/layout/SearchResultTile";
import {
  SEARCH_RESULT_EXIT_MS,
  useAnimatedSearchResults,
} from "@/components/layout/useAnimatedSearchResults";
import type { WikiArticleSummary } from "@/types/wiki";

interface AnimatedSearchResultsProps {
  results: WikiArticleSummary[];
  onSelect: () => void;
}

function itemMotionClass(state: "enter" | "stable" | "exit") {
  if (state === "enter") return "search-result-item-enter";
  if (state === "exit") return "search-result-item-exit";
  return "";
}

export function AnimatedSearchResults({
  results,
  onSelect,
}: AnimatedSearchResultsProps) {
  const items = useAnimatedSearchResults(results);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [bodyHeight, setBodyHeight] = useState(0);

  const showEmpty = results.length === 0 && items.length === 0;

  useLayoutEffect(() => {
    const el = bodyRef.current;
    if (!el) return;

    const updateHeight = () => {
      setBodyHeight(el.scrollHeight);
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(el);

    return () => observer.disconnect();
  }, [items, showEmpty]);

  return (
    <div className="search-results-root mt-4">
      <div className="search-results-scroll scrollbar-none">
        <p className="game-section-title mb-1.5">Results</p>
        <div
          className="search-results-body transition-[max-height] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{ maxHeight: bodyHeight }}
        >
          <div ref={bodyRef} className="search-results-body-inner">
            {showEmpty ? (
              <p className="search-result-item-enter game-panel w-full max-w-md rounded-lg border border-border px-3 py-2.5 text-sm text-muted">
                No results found.
              </p>
            ) : (
              <ul className="flex w-full max-w-md flex-col gap-1">
                {items.map((item) => (
                  <li key={item.article.slug} className="last:mb-0">
                    <div
                      className={`search-result-item-motion ${itemMotionClass(item.state)}`}
                      style={
                        item.state === "exit"
                          ? {
                              animationDuration: `${SEARCH_RESULT_EXIT_MS}ms`,
                            }
                          : undefined
                      }
                    >
                      <SearchResultTile
                        article={item.article}
                        onSelect={onSelect}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

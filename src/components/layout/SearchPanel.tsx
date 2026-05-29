"use client";

import { useId, useRef } from "react";
import { AnimatedSearchResults } from "@/components/layout/AnimatedSearchResults";
import { SearchNavIcon } from "@/components/ui/NavIconButton";
import type { WikiArticleSummary } from "@/types/wiki";

interface SearchPanelProps {
  query: string;
  onQueryChange: (query: string) => void;
  results: WikiArticleSummary[];
  onSelect: () => void;
}

export function SearchPanel({
  query,
  onQueryChange,
  results,
  onSelect,
}: SearchPanelProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const showResults = query.trim().length >= 2;

  return (
    <div className="search-panel">
      <div className="search-panel-input-wrap">
        <div className="underline-field search-panel-field">
          <span className="search-panel-field-icon shrink-0" aria-hidden>
            <SearchNavIcon />
          </span>
          <label htmlFor={inputId} className="sr-only">
            Search articles
          </label>
          <input
            ref={inputRef}
            id={inputId}
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search articles..."
            className="h-full w-full min-w-0 border-0 bg-transparent text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none"
          />
        </div>
      </div>

      {showResults && (
        <AnimatedSearchResults results={results} onSelect={onSelect} />
      )}
    </div>
  );
}

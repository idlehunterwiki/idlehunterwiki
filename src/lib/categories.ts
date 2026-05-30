import type { WikiCategory } from "@/types/wiki";

export interface CategoryMeta {
  id: WikiCategory;
  label: string;
  description: string;
  gradient: string;
  symbol: string;
}

export const WIKI_CATEGORIES: CategoryMeta[] = [
  {
    id: "getting-started",
    label: "Getting Started",
    description: "First steps, hunt log, and idle basics.",
    gradient: "from-amber-950/90 via-zinc-900 to-zinc-950",
    symbol: "◆",
  },
  {
    id: "heroes-classes",
    label: "Heroes & Classes",
    description: "Warrior, Hunter, Mage, and hero stats.",
    gradient: "from-red-950/80 via-zinc-900 to-zinc-950",
    symbol: "⚔",
  },
  {
    id: "gear-items",
    label: "Gear & Items",
    description: "Equipment slots, rarity, and inventory.",
    gradient: "from-zinc-700/50 via-zinc-900 to-zinc-950",
    symbol: "⛨",
  },
  {
    id: "gems",
    label: "Gems",
    description: "Gem pouch, sockets, and bonuses.",
    gradient: "from-cyan-950/70 via-zinc-900 to-zinc-950",
    symbol: "◇",
  },
  {
    id: "talents",
    label: "Talents",
    description: "Talent trees and build planning.",
    gradient: "from-purple-950/80 via-zinc-900 to-zinc-950",
    symbol: "✦",
  },
  {
    id: "hunting-dungeons",
    label: "Hunting & Dungeons",
    description: "Zones, enemies, and dungeon runs.",
    gradient: "from-emerald-950/70 via-zinc-900 to-zinc-950",
    symbol: "⌖",
  },
  {
    id: "currencies",
    label: "Currencies",
    description: "Gold, Divine, Relic, and other resources.",
    gradient: "from-amber-900/50 via-zinc-900 to-zinc-950",
    symbol: "◈",
  },
  {
    id: "game-modes",
    label: "Game Modes",
    description: "Duels, Heist, Gamble, and Leaderboard.",
    gradient: "from-indigo-950/70 via-zinc-900 to-zinc-950",
    symbol: "⚑",
  },
];

/** Core categories shown on the home page — full list stays in the nav menu. */
export const HOME_FEATURED_CATEGORY_IDS: WikiCategory[] = [
  "getting-started",
  "heroes-classes",
  "gear-items",
  "talents",
  "hunting-dungeons",
  "game-modes",
];

export function getFeaturedCategories(): CategoryMeta[] {
  return HOME_FEATURED_CATEGORY_IDS.map((id) => getCategoryMeta(id));
}

export function getCategoryMeta(id: WikiCategory): CategoryMeta {
  const meta = WIKI_CATEGORIES.find((c) => c.id === id);
  if (!meta) {
    throw new Error(`Unknown category: ${id}`);
  }
  return meta;
}

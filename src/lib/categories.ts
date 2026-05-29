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
    description: "Core mechanics and your first hours.",
    gradient: "from-amber-950/90 via-zinc-900 to-zinc-950",
    symbol: "◆",
  },
  {
    id: "classes",
    label: "Classes",
    description: "Playable classes and builds.",
    gradient: "from-red-950/80 via-zinc-900 to-zinc-950",
    symbol: "⚔",
  },
  {
    id: "equipment",
    label: "Equipment",
    description: "Weapons, armor, and rarity.",
    gradient: "from-zinc-700/50 via-zinc-900 to-zinc-950",
    symbol: "⛨",
  },
  {
    id: "skills",
    label: "Skills",
    description: "Talents and skill trees.",
    gradient: "from-purple-950/80 via-zinc-900 to-zinc-950",
    symbol: "✦",
  },
  {
    id: "world",
    label: "World",
    description: "Zones and dungeons.",
    gradient: "from-emerald-950/70 via-zinc-900 to-zinc-950",
    symbol: "⌖",
  },
  {
    id: "bosses",
    label: "Bosses",
    description: "World bosses and loot.",
    gradient: "from-red-900/60 via-zinc-950 to-black",
    symbol: "☠",
  },
  {
    id: "resources",
    label: "Resources",
    description: "Currencies, materials, and crafting.",
    gradient: "from-amber-900/50 via-zinc-900 to-zinc-950",
    symbol: "◈",
  },
  {
    id: "guides",
    label: "Guides",
    description: "Tips for late game and endgame.",
    gradient: "from-indigo-950/70 via-zinc-900 to-zinc-950",
    symbol: "¶",
  },
];

export function getCategoryMeta(id: WikiCategory): CategoryMeta {
  const meta = WIKI_CATEGORIES.find((c) => c.id === id);
  if (!meta) {
    throw new Error(`Unknown category: ${id}`);
  }
  return meta;
}

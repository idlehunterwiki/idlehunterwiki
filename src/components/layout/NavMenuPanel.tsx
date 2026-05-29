"use client";

import { usePathname } from "next/navigation";
import { NavMenuTile } from "@/components/layout/NavMenuTile";
import { WIKI_CATEGORIES } from "@/lib/categories";

const mainLinks = [
  {
    href: "/wiki",
    label: "Articles",
    description: "Browse every guide and wiki page",
    symbol: "☰",
    gradient: "from-amber-950/80 via-zinc-900 to-zinc-950",
    match: (pathname: string) =>
      pathname === "/wiki" || pathname.startsWith("/wiki/"),
  },
] as const;

interface NavMenuPanelProps {
  onNavigate?: () => void;
}

export function NavMenuPanel({ onNavigate }: NavMenuPanelProps) {
  const pathname = usePathname();

  return (
    <nav className="nav-menu-panel" aria-label="Main navigation">
      <p className="game-section-title mb-2">Browse</p>
      <ul className="flex flex-col gap-2">
        {mainLinks.map((link) => (
          <li key={link.href}>
            <NavMenuTile
              href={link.href}
              label={link.label}
              description={link.description}
              symbol={link.symbol}
              gradient={link.gradient}
              active={link.match(pathname)}
              onClick={onNavigate}
            />
          </li>
        ))}
      </ul>

      <p className="game-section-title mb-2 mt-5">Categories</p>
      <ul className="nav-menu-category-grid">
        {WIKI_CATEGORIES.map((cat) => (
          <li key={cat.id}>
            <NavMenuTile
              href={`/category/${cat.id}`}
              label={cat.label}
              description={cat.description}
              symbol={cat.symbol}
              gradient={cat.gradient}
              active={pathname === `/category/${cat.id}`}
              onClick={onNavigate}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}

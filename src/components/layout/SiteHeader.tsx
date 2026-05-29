"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ProfilePanel } from "@/components/auth/ProfilePanel";
import { useUserProfile } from "@/components/auth/useUserProfile";
import { UserMenuButton } from "@/components/auth/UserMenuButton";
import { NavSlidePanel } from "@/components/layout/NavSlidePanel";
import { SearchPanel } from "@/components/layout/SearchPanel";
import { WikiLogoMark } from "@/components/layout/WikiLogoMark";
import { NavMenuPanel } from "@/components/layout/NavMenuPanel";
import {
  MenuNavIcon,
  NavIconButton,
  SearchNavIcon,
} from "@/components/ui/NavIconButton";
import { useArticleSearch } from "@/components/wiki/useArticleSearch";
import type { Profile } from "@/types/auth";
import type { SupabasePublicConfig } from "@/lib/supabase/config";
import type { WikiArticleSummary } from "@/types/wiki";

interface SiteHeaderProps {
  articles: WikiArticleSummary[];
  initialProfile: Profile | null;
  authConfig: SupabasePublicConfig | null;
}

export function SiteHeader({
  articles,
  initialProfile,
  authConfig,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const headerRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { query, setQuery, results } = useArticleSearch(articles);
  const { mounted, profile, loading, configured } = useUserProfile(
    initialProfile,
    authConfig,
  );

  const showSearchResults = searchOpen && query.trim().length >= 2;

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setProfileOpen(false);
    setQuery("");
  }, [pathname, setQuery]);

  useEffect(() => {
    if (!showSearchResults) return;

    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, [showSearchResults]);

  useEffect(() => {
    if (!searchOpen && !profileOpen) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setProfileOpen(false);
        setQuery("");
      }
    }

    function onPointerDown(e: MouseEvent) {
      if (
        headerRef.current &&
        !headerRef.current.contains(e.target as Node)
      ) {
        setSearchOpen(false);
        setProfileOpen(false);
        setQuery("");
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [searchOpen, profileOpen, setQuery]);

  function closeSearch() {
    setSearchOpen(false);
    setQuery("");
  }

  function openMenu() {
    setSearchOpen(false);
    setProfileOpen(false);
    setQuery("");
    setMenuOpen((v) => !v);
  }

  function toggleSearch() {
    setMenuOpen(false);
    setProfileOpen(false);
    setSearchOpen((v) => {
      if (v) setQuery("");
      return !v;
    });
  }

  function toggleProfile() {
    setMenuOpen(false);
    setSearchOpen(false);
    setQuery("");
    setProfileOpen((v) => !v);
  }

  return (
    <header className="sticky top-0 z-50">
      <div
        aria-hidden
        className="h-px bg-gradient-to-r from-transparent via-amber/50 to-transparent"
      />
      <div
        ref={headerRef}
        className="relative bg-panel/90 backdrop-blur-xl"
      >
        <div className="relative z-10 border-b border-border">
          <div className="relative mx-auto flex h-[4.5rem] max-w-[90rem] items-center justify-between gap-3 px-4 sm:gap-4 sm:px-8 lg:px-10">
            <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
              <WikiLogoMark />

              <NavIconButton
                variant="plain"
                active={menuOpen}
                activeGlow="icon"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                onClick={openMenu}
              >
                <MenuNavIcon open={menuOpen} />
              </NavIconButton>

              <NavIconButton
                variant="plain"
                active={searchOpen}
                activeGlow="icon"
                aria-label={searchOpen ? "Close search" : "Open search"}
                aria-expanded={searchOpen}
                onClick={toggleSearch}
              >
                <SearchNavIcon />
              </NavIconButton>
            </div>

            {configured && (
              <UserMenuButton
                open={profileOpen}
                loading={loading}
                mounted={mounted}
                profile={profile}
                onToggle={toggleProfile}
              />
            )}
          </div>
        </div>

        <NavSlidePanel open={searchOpen} aria-label="Search">
          <SearchPanel
            query={query}
            onQueryChange={setQuery}
            results={results}
            onSelect={closeSearch}
          />
        </NavSlidePanel>

        {configured && (
          <NavSlidePanel open={profileOpen} aria-label="Account">
            <ProfilePanel
              profile={profile}
              loading={loading}
              panelOpen={profileOpen}
            />
          </NavSlidePanel>
        )}

        <NavSlidePanel open={menuOpen}>
          <NavMenuPanel onNavigate={() => setMenuOpen(false)} />
        </NavSlidePanel>
      </div>
    </header>
  );
}

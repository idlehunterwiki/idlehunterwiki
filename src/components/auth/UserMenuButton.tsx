"use client";

import { NavIconButton, ProfileNavIcon } from "@/components/ui/NavIconButton";
import type { Profile } from "@/types/auth";

function MenuSkeleton() {
  return (
    <span
      className="inline-block h-12 w-12 animate-pulse rounded-lg bg-zinc-800"
      aria-hidden
    />
  );
}

interface UserMenuButtonProps {
  open: boolean;
  loading: boolean;
  mounted: boolean;
  profile: Profile | null;
  onToggle: () => void;
}

export function UserMenuButton({
  open,
  loading,
  mounted,
  profile,
  onToggle,
}: UserMenuButtonProps) {
  if (!mounted || loading) {
    return <MenuSkeleton />;
  }

  const name = profile?.display_name ?? profile?.email ?? "User";

  return (
    <NavIconButton
      variant="plain"
      aria-label={profile ? "Account menu" : "Sign in"}
      aria-expanded={open}
      active={open}
      activeGlow="icon"
      onClick={onToggle}
    >
      {profile ? (
        <span
          className={`nav-icon-glow-target flex h-9 w-9 items-center justify-center rounded-full border text-base font-bold leading-none text-current transition-[border-color,background-color,filter] duration-200 ${
            open
              ? "border-amber/45 bg-amber/10"
              : "border-zinc-600/55 bg-transparent"
          }`}
        >
          {name.charAt(0).toUpperCase()}
        </span>
      ) : (
        <ProfileNavIcon />
      )}
    </NavIconButton>
  );
}

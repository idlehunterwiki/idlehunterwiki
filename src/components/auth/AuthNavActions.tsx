"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface AuthNavActionsProps {
  compact?: boolean;
}

export function AuthNavActions({ compact = false }: AuthNavActionsProps) {
  const pathname = usePathname();
  const onLogin = pathname === "/login";
  const onSignUp = pathname === "/sign-up";

  return (
    <div
      className={`auth-actions flex items-center ${compact ? "gap-2" : "gap-3"}`}
    >
      <Link
        href="/login"
        className={`auth-login group relative font-medium transition-colors ${
          compact ? "px-2 py-1.5 text-xs" : "px-3 py-2 text-sm"
        } ${onLogin ? "text-amber" : "text-zinc-400 hover:text-zinc-100"}`}
      >
        Log in
        <span
          aria-hidden
          className={`absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-amber transition-transform duration-200 ease-out ${
            onLogin ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
          } ${compact ? "left-2 right-2" : ""}`}
        />
      </Link>

      <span
        aria-hidden
        className={`hidden bg-zinc-700 sm:block ${compact ? "h-3 w-px" : "h-4 w-px"}`}
      />

      <Link
        href="/sign-up"
        className={`auth-signup group relative inline-flex items-center justify-center overflow-hidden rounded-lg font-semibold tracking-wide transition-all duration-200 ease-out hover:-translate-y-px hover:shadow-[0_0_28px_rgba(245,158,11,0.45)] active:translate-y-0 active:scale-[0.98] ${
          compact ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"
        } ${onSignUp ? "ring-2 ring-amber/60 ring-offset-2 ring-offset-[#1a1c23]" : ""}`}
      >
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-amber-dim via-amber to-[#fbbf24]"
        />
        <span
          aria-hidden
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-500 group-hover:translate-x-full"
        />
        <span className="relative z-10 text-zinc-950">Sign up</span>
      </Link>
    </div>
  );
}

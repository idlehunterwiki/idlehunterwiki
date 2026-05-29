"use client";

import Link from "next/link";
import { type ComponentProps } from "react";

type NavButtonVariant = "default" | "primary" | "ghost";

const base =
  "relative inline-flex items-center justify-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 ease-out select-none";

const variants: Record<NavButtonVariant, string> = {
  default:
    "border border-transparent text-muted hover:border-border hover:bg-panel-hover hover:text-zinc-100 hover:shadow-[0_0_12px_rgba(245,158,11,0.08)] active:scale-[0.97] active:bg-zinc-800",
  primary:
    "border border-amber-dim/80 bg-amber text-zinc-950 shadow-[0_0_0_1px_rgba(0,0,0,0.2)] hover:bg-[#fbbf24] hover:shadow-[0_0_20px_rgba(245,158,11,0.35)] active:scale-[0.96] active:brightness-95",
  ghost:
    "border border-border/60 text-zinc-300 bg-zinc-900/50 hover:border-zinc-600 hover:bg-panel-hover hover:text-zinc-100 active:scale-[0.97]",
};

const activeStyles =
  "border-amber/40 bg-amber/10 text-amber shadow-[inset_0_1px_0_rgba(251,191,36,0.15),0_0_14px_rgba(245,158,11,0.12)]";

interface NavButtonLinkProps extends ComponentProps<typeof Link> {
  active?: boolean;
  variant?: NavButtonVariant;
}

export function NavButtonLink({
  active = false,
  variant = "default",
  className = "",
  children,
  ...props
}: NavButtonLinkProps) {
  return (
    <Link
      className={`${base} ${variants[variant]} ${active ? activeStyles : ""} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}

interface NavButtonProps extends ComponentProps<"button"> {
  active?: boolean;
  variant?: NavButtonVariant;
}

export function NavButton({
  active = false,
  variant = "default",
  className = "",
  children,
  ...props
}: NavButtonProps) {
  return (
    <button
      type="button"
      className={`${base} ${variants[variant]} ${active ? activeStyles : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

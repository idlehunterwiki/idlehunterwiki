"use client";

import Link from "next/link";
import { type ComponentProps } from "react";

function underlineClasses(active: boolean, className: string) {
  return [
    "group relative inline-flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors",
    active ? "text-amber" : "text-zinc-400 hover:text-zinc-100",
    className,
  ].join(" ");
}

function UnderlineBar({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden
      className={`absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-amber transition-transform duration-200 ease-out ${
        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
      }`}
    />
  );
}

interface NavUnderlineLinkProps extends ComponentProps<typeof Link> {
  active?: boolean;
}

export function NavUnderlineLink({
  active = false,
  className = "",
  children,
  ...props
}: NavUnderlineLinkProps) {
  return (
    <Link className={underlineClasses(active, className)} {...props}>
      {children}
      <UnderlineBar active={active} />
    </Link>
  );
}

interface NavUnderlineButtonProps extends ComponentProps<"button"> {
  active?: boolean;
}

export function NavUnderlineButton({
  active = false,
  className = "",
  children,
  ...props
}: NavUnderlineButtonProps) {
  return (
    <button type="button" className={underlineClasses(active, className)} {...props}>
      {children}
      <UnderlineBar active={active} />
    </button>
  );
}

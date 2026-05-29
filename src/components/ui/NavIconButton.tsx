"use client";

import Link from "next/link";
import { type ComponentProps } from "react";

const variants = {
  default:
    "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-zinc-400 transition-all duration-200 hover:bg-panel-hover hover:text-zinc-100 active:scale-[0.97]",
  plain:
    "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-transparent text-zinc-400 transition-colors duration-200 hover:bg-transparent hover:text-zinc-100 active:scale-[0.97]",
};

const activeBoxStyles =
  "bg-amber/10 text-amber shadow-[0_0_0_1px_rgba(245,158,11,0.4),0_0_10px_rgba(245,158,11,0.42),0_0_20px_rgba(245,158,11,0.18)]";

type NavIconButtonProps = {
  active?: boolean;
  /** "icon" = amber icon + glow on the glyph only; "box" = highlighted button area */
  activeGlow?: "icon" | "box";
  variant?: keyof typeof variants;
  "aria-label": string;
  className?: string;
} & (
  | ({ href: string } & Omit<ComponentProps<typeof Link>, "className">)
  | ({ href?: undefined } & ComponentProps<"button">)
);

function activeClass(
  active: boolean,
  variant: keyof typeof variants,
  activeGlow: "icon" | "box" | undefined,
) {
  if (!active) return "";
  const glow = activeGlow ?? (variant === "plain" ? "icon" : "box");
  return glow === "icon" ? "nav-icon-button--active-icon" : activeBoxStyles;
}

export function NavIconButton({
  active = false,
  activeGlow,
  variant = "default",
  className = "",
  children,
  ...props
}: NavIconButtonProps) {
  const classes = `${variants[variant]} ${activeClass(active, variant, activeGlow)} ${className}`;

  if ("href" in props && props.href) {
    const { href, ...linkProps } = props;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  const { href: _href, ...buttonProps } = props as ComponentProps<"button"> & {
    href?: undefined;
  };

  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  );
}

export function SearchNavIcon() {
  return (
    <svg
      aria-hidden
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
      />
    </svg>
  );
}

export function MenuNavIcon({ open }: { open?: boolean }) {
  return (
    <svg
      aria-hidden
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      {open ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      ) : (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 6h16M4 12h16M4 18h16"
        />
      )}
    </svg>
  );
}

export function ProfileNavIcon() {
  return (
    <svg
      aria-hidden
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-3.87 0-7 1.94-7 4.33V20h14v-1.67C19 15.94 15.87 14 12 14Z" />
    </svg>
  );
}

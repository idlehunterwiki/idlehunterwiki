import Link from "next/link";

export function WikiLogoMark() {
  return (
    <Link
      href="/"
      className="wiki-logo-mark group flex shrink-0 flex-col leading-tight py-1"
    >
      <span className="wiki-logo-mark-title font-display text-base font-bold tracking-widest text-amber sm:text-lg">
        IDLE HUNTER
      </span>
      <span className="wiki-logo-mark-sub mt-0.5 text-[10px] font-medium uppercase tracking-[0.2em] text-muted sm:text-xs">
        Wiki
      </span>
    </Link>
  );
}

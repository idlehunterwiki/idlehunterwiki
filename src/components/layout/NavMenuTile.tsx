import Link from "next/link";

interface NavMenuTileProps {
  href: string;
  label: string;
  description: string;
  symbol: string;
  gradient: string;
  active?: boolean;
  onClick?: () => void;
}

export function NavMenuTile({
  href,
  label,
  description,
  symbol,
  gradient,
  active = false,
  onClick,
}: NavMenuTileProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`nav-menu-tile game-panel flex items-center gap-2.5 rounded-lg border p-2.5 no-underline transition-[border-color,box-shadow] duration-200 active:scale-[0.99] ${
        active ? "nav-menu-tile--active" : "border-border"
      }`}
      aria-current={active ? "page" : undefined}
    >
      <span
        aria-hidden
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border/60 bg-gradient-to-br ${gradient} text-sm text-zinc-300`}
      >
        {symbol}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-zinc-100">{label}</p>
        <p className="mt-0.5 line-clamp-1 text-xs text-zinc-500">{description}</p>
      </div>
    </Link>
  );
}

import Link from "next/link";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-panel/50">
      <div className="mx-auto max-w-[90rem] px-4 py-6 sm:px-8 lg:px-10">
        <nav
          className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted"
          aria-label="Footer"
        >
          <Link href="/wiki" className="hover:text-zinc-200">
            Articles
          </Link>
          <Link href="/search" className="hover:text-zinc-200">
            Search
          </Link>
          <Link href="/wiki/getting-started" className="hover:text-zinc-200">
            Getting Started
          </Link>
        </nav>
        <p className="mt-4 text-sm text-zinc-500">
          Community wiki for Idle Hunter. Not necessarily official.
        </p>
        <p className="mt-2 text-xs text-zinc-600">© {year}</p>
      </div>
    </footer>
  );
}

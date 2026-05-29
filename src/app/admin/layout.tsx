import Link from "next/link";
import { requireAdmin } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="mx-auto max-w-[90rem] px-4 py-8 sm:px-6 sm:py-10">
      <div className="mb-8 border-b border-border pb-4">
        <p className="game-section-title">Administration</p>
        <nav className="mt-3 flex flex-wrap gap-4 text-sm">
          <Link href="/admin" className="text-muted hover:text-amber">
            Overview
          </Link>
          <Link href="/admin/users" className="text-muted hover:text-amber">
            Users
          </Link>
          <Link href="/" className="text-zinc-600 hover:text-zinc-400">
            ← Back to wiki
          </Link>
        </nav>
      </div>
      {children}
    </div>
  );
}

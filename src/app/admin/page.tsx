import type { Metadata } from "next";
import Link from "next/link";
import { Panel } from "@/components/ui/Panel";
import { getCurrentProfile } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin",
};

export default async function AdminPage() {
  const profile = await getCurrentProfile();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-zinc-100">Admin</h1>
      <p className="mt-2 text-muted">
        Hello {profile?.display_name}. Manage the wiki here.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link href="/admin/users" className="game-panel block p-5 hover:border-amber/30">
          <h2 className="font-display text-lg font-semibold text-zinc-100">Users</h2>
          <p className="mt-1 text-sm text-muted">
            View all accounts and grant or revoke admin role.
          </p>
        </Link>

        <Panel className="p-5 opacity-60">
          <h2 className="font-display text-lg font-semibold text-zinc-400">Articles</h2>
          <p className="mt-1 text-sm text-zinc-600">Wiki article editing coming soon.</p>
        </Panel>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { Panel } from "@/components/ui/Panel";
import { UserRoleForm } from "@/components/admin/UserRoleForm";
import { requireAdmin, roleLabel } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/types/auth";

export const metadata: Metadata = {
  title: "Users",
};

export default async function AdminUsersPage() {
  const { user } = await requireAdmin();
  const supabase = await createClient();

  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <p className="text-red-400">Could not load users: {error.message}</p>
    );
  }

  const list = (profiles ?? []) as Profile[];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-zinc-100">Users</h1>
      <p className="mt-2 text-sm text-muted">{list.length} registered accounts</p>

      <Panel className="mt-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-zinc-900/80 text-muted">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Change role</th>
              </tr>
            </thead>
            <tbody>
              {list.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 text-zinc-200">
                    {p.display_name ?? "—"}
                    {p.id === user.id && (
                      <span className="ml-2 text-xs text-zinc-500">(you)</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted">{p.email}</td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        p.role === "admin" ? "text-amber" : "text-zinc-400"
                      }
                    >
                      {roleLabel(p.role)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <UserRoleForm profile={p} currentUserId={user.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <p className="mt-4 text-xs text-zinc-600">
        First admin: run SQL in Supabase after signing up, or assign roles here if
        you are already an admin.
      </p>
    </div>
  );
}

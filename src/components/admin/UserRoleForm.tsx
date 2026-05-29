"use client";

import { useTransition } from "react";
import { updateUserRole } from "@/app/auth/actions";
import type { Profile, UserRole } from "@/types/auth";

interface UserRoleFormProps {
  profile: Profile;
  currentUserId: string;
}

export function UserRoleForm({ profile, currentUserId }: UserRoleFormProps) {
  const [pending, startTransition] = useTransition();
  const isSelf = profile.id === currentUserId;

  function setRole(role: UserRole) {
    startTransition(async () => {
      await updateUserRole(profile.id, role);
    });
  }

  return (
    <div className="flex items-center gap-2">
      <select
        value={profile.role}
        disabled={pending || (isSelf && profile.role === "admin")}
        onChange={(e) => setRole(e.target.value as UserRole)}
        className="rounded-lg border border-border bg-zinc-950 px-2 py-1 text-sm text-zinc-200 focus:border-amber/50 focus:outline-none"
        aria-label={`Role for ${profile.display_name}`}
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      {pending && <span className="text-xs text-muted">Saving...</span>}
    </div>
  );
}

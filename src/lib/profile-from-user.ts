import type { User } from "@supabase/supabase-js";
import type { Profile } from "@/types/auth";

/** Fallback when the profiles row is missing or still syncing. */
export function profileFromAuthUser(user: User): Profile {
  const meta = user.user_metadata ?? {};
  const displayName =
    (typeof meta.display_name === "string" && meta.display_name.trim()) ||
    null;

  return {
    id: user.id,
    email: user.email ?? null,
    display_name: displayName,
    role: "user",
    created_at: user.created_at,
    updated_at: user.updated_at ?? user.created_at,
  };
}

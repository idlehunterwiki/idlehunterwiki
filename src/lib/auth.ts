import { redirect } from "next/navigation";
import type { Profile } from "@/types/auth";
export { roleLabel } from "@/lib/role-label";
import { profileFromAuthUser } from "@/lib/profile-from-user";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export async function getSessionUser() {
  if (!isSupabaseConfigured()) return null;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getProfile(userId: string): Promise<Profile | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (data) return data as Profile;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || user.id !== userId) return null;

  const { data: ensured, error: ensureError } =
    await supabase.rpc("ensure_profile");

  if (!ensureError && ensured) {
    return ensured as Profile;
  }

  return profileFromAuthUser(user);
}

export async function getCurrentProfile(): Promise<Profile | null> {
  const user = await getSessionUser();
  if (!user) return null;
  return getProfile(user.id);
}

export async function isAdmin(userId?: string): Promise<boolean> {
  const id = userId ?? (await getSessionUser())?.id;
  if (!id) return false;
  const profile = await getProfile(id);
  return profile?.role === "admin";
}

export async function requireAuth(redirectTo = "/login") {
  const user = await getSessionUser();
  if (!user) redirect(redirectTo);
  return user;
}

export async function requireAdmin() {
  const user = await requireAuth();
  const profile = await getProfile(user.id);
  if (profile?.role !== "admin") {
    redirect("/");
  }
  return { user, profile: profile! };
}


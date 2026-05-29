"use client";

import type { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { profileFromAuthUser } from "@/lib/profile-from-user";
import type { Profile } from "@/types/auth";

export function useUserProfile(initialProfile: Profile | null = null) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(initialProfile);
  const [loading, setLoading] = useState(!initialProfile);
  const hasProfileRef = useRef(!!initialProfile);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setProfile(initialProfile);
    hasProfileRef.current = !!initialProfile;
    setLoading(!initialProfile);
  }, [initialProfile]);

  useEffect(() => {
    if (!mounted) return;

    if (!isSupabaseConfigured()) {
      setLoading(false);
      return;
    }

    const supabase = createClient();

    async function resolveProfile(user: User): Promise<Profile> {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (data) {
        return data as Profile;
      }

      const { data: ensured, error: ensureError } =
        await supabase.rpc("ensure_profile");

      if (!ensureError && ensured) {
        return ensured as Profile;
      }

      return profileFromAuthUser(user);
    }

    async function load() {
      if (!hasProfileRef.current) {
        setLoading(true);
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      const user = session?.user ?? null;
      if (!user) {
        setProfile(null);
        hasProfileRef.current = false;
        setLoading(false);
        return;
      }

      const next = await resolveProfile(user);
      setProfile(next);
      hasProfileRef.current = true;
      setLoading(false);
    }

    void load();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      void load();
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "TOKEN_REFRESHED") {
        router.refresh();
      }
    });

    return () => subscription.unsubscribe();
  }, [mounted, router]);

  return { mounted, profile, loading, configured: isSupabaseConfigured() };
}

import { createBrowserClient } from "@supabase/ssr";
import type { SupabasePublicConfig } from "@/lib/supabase/config";

export function createClient(config?: SupabasePublicConfig) {
  const url = config?.url ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = config?.anonKey ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error("Supabase environment variables are not configured");
  }

  return createBrowserClient(url, anonKey);
}

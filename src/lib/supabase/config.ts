export type SupabasePublicConfig = {
  url: string;
  anonKey: string;
};

function readPublicEnv(): SupabasePublicConfig | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  if (!url || !anonKey) return null;
  return { url, anonKey };
}

export function getSupabasePublicConfig(): SupabasePublicConfig | null {
  return readPublicEnv();
}

/** Prefer server config; fall back to build-inlined client env. */
export function resolveSupabasePublicConfig(
  serverConfig: SupabasePublicConfig | null,
): SupabasePublicConfig | null {
  return serverConfig ?? readPublicEnv();
}

export function isSupabaseConfigured(): boolean {
  return getSupabasePublicConfig() !== null;
}

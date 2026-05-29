import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/** 30 days — used when "Remember me" is checked on login. */
export const AUTH_REMEMBER_MAX_AGE = 60 * 60 * 24 * 30;

type CreateClientOptions = {
  /** When true, auth cookies persist across browser restarts. */
  rememberSession?: boolean;
};

export async function createClient(options?: CreateClientOptions) {
  const cookieStore = await cookies();
  const rememberSession = options?.rememberSession ?? false;

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options: cookieOptions }) => {
              if (rememberSession) {
                cookieStore.set(name, value, {
                  ...cookieOptions,
                  maxAge: AUTH_REMEMBER_MAX_AGE,
                });
              } else {
                const { maxAge: _maxAge, ...sessionOptions } =
                  cookieOptions ?? {};
                cookieStore.set(name, value, sessionOptions);
              }
            });
          } catch {
            // Ignored in Server Components — middleware refreshes the session.
          }
        },
      },
    },
  );
}

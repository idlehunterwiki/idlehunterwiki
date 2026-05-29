type ProfileAuthInfoMode = "login" | "signup";

const LOGIN_ITEMS = [
  "Access your hunter profile",
  "Pick up where you left off",
  "Contribute guides and edits",
] as const;

const SIGNUP_ITEMS = [
  "Choose your display name",
  "Join the community wiki",
  "Ready in under a minute",
] as const;

export function ProfileAuthInfo({
  mode,
  className = "",
}: {
  mode: ProfileAuthInfoMode;
  className?: string;
}) {
  if (mode === "login") {
    return (
      <aside
        className={`profile-panel-info ${className}`.trim()}
        aria-label="About logging in"
      >
        <h3 className="font-display text-xl font-bold leading-snug text-zinc-100 sm:text-2xl">
          Welcome <span className="text-amber">back.</span>
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-zinc-500">
          Sign in to sync your profile, follow wiki updates, and jump straight
          into the guides you care about.
        </p>
        <ul className="mt-5 space-y-2.5">
          {LOGIN_ITEMS.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-sm text-zinc-400"
            >
              <span className="mt-1.5 text-[8px] text-amber" aria-hidden>
                ◆
              </span>
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-6 hidden font-display text-sm italic text-zinc-600 sm:block">
          &ldquo;The best loot is knowledge.&rdquo;
        </p>
      </aside>
    );
  }

  return (
    <aside
      className={`profile-panel-info ${className}`.trim()}
      aria-label="About signing up"
    >
      <h3 className="font-display text-xl font-bold leading-snug text-zinc-100 sm:text-2xl">
        Join the <span className="text-amber">hunt.</span>
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-zinc-500">
        Create a free account to save your identity on the wiki, share what you
        learn, and grow with other Idle Hunter players.
      </p>
      <ul className="mt-5 space-y-2.5">
        {SIGNUP_ITEMS.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-sm text-zinc-400"
          >
            <span className="mt-1.5 text-[8px] text-amber" aria-hidden>
              ◆
            </span>
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-6 hidden font-display text-sm italic text-zinc-600 sm:block">
        Built by hunters, for hunters.
      </p>
    </aside>
  );
}

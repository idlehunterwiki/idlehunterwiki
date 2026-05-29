import Link from "next/link";

interface AuthPageShellProps {
  mode: "login" | "signup";
  children: React.ReactNode;
}

const COPY_ITEMS = [
  "Save your hunter profile",
  "Community-driven knowledge base",
  "Built for idle & MMO players",
] as const;

function AuthCopyColumn({ side }: { side: "left" | "right" }) {
  const pad = side === "left" ? "lg:pr-12" : "lg:pl-12";

  return (
    <aside
      className={`lg:flex lg:min-w-0 lg:flex-1 lg:flex-col lg:justify-center ${pad}`}
    >
      <Link
        href="/"
        className="mb-6 hidden font-display text-xs font-semibold tracking-[0.35em] text-amber lg:inline-block"
      >
        IDLE HUNTER
      </Link>
      <h2 className="font-display text-3xl font-bold leading-tight text-zinc-100 sm:text-4xl lg:text-5xl">
        Join the <span className="text-amber">hunt.</span>
      </h2>
      <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-500 lg:text-base">
        Create an account to track your progress, contribute to the wiki, and
        unlock admin tools when granted.
      </p>
      <ul className="mt-8 hidden gap-3 lg:grid">
        {COPY_ITEMS.map((item) => (
          <li
            key={item}
            className="flex items-center gap-2.5 text-sm text-zinc-400 lg:text-base"
          >
            <span className="text-[10px] text-amber">◆</span>
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-8 hidden font-display text-sm italic text-zinc-600 lg:block">
        &ldquo;The best loot is knowledge.&rdquo;
      </p>
    </aside>
  );
}

function AuthDivider() {
  return (
    <div
      aria-hidden
      className="auth-divider my-8 hidden w-px shrink-0 self-stretch lg:block lg:my-0"
    />
  );
}

function AuthFormColumn({
  side,
  children,
}: {
  side: "left" | "right";
  children: React.ReactNode;
}) {
  const pad = side === "left" ? "lg:pr-12" : "lg:pl-12";

  return (
    <div
      className={`w-full lg:flex lg:min-w-0 lg:flex-1 lg:flex-col lg:justify-center ${pad}`}
    >
      {children}
    </div>
  );
}

export function AuthPageShell({ mode, children }: AuthPageShellProps) {
  const formOnLeft = mode === "signup";

  return (
    <div className="auth-page relative flex min-h-[calc(100dvh-8.5rem)] items-center justify-center overflow-hidden px-4 py-10 lg:min-h-[calc(100dvh-5.5rem)] lg:py-12">
      <div aria-hidden className="auth-page-bg pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/4 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-amber/8 blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-1/4 bottom-1/4 h-64 w-64 translate-x-1/2 rounded-full bg-purple-600/8 blur-[100px]"
      />

      <div className="relative w-full max-w-6xl">
        <div className="mb-8 text-center lg:hidden">
          <Link
            href="/"
            className="font-display text-xl font-bold tracking-widest text-amber"
          >
            IDLE HUNTER
          </Link>
          <span className="ml-2 text-xs uppercase tracking-widest text-zinc-600">
            Wiki
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center lg:gap-8">
          {formOnLeft ? (
            <>
              <AuthFormColumn side="left">{children}</AuthFormColumn>
              <AuthDivider />
              <AuthCopyColumn side="right" />
            </>
          ) : (
            <>
              <AuthCopyColumn side="left" />
              <AuthDivider />
              <AuthFormColumn side="right">{children}</AuthFormColumn>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

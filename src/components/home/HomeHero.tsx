import Link from "next/link";
import { displayNameFor } from "@/lib/account-profile-progress";
import { getCurrentProfile } from "@/lib/auth";

interface HomeHeroProps {
  totalArticles: number;
}

export async function HomeHero({ totalArticles }: HomeHeroProps) {
  const profile = await getCurrentProfile();

  if (profile) {
    const name = displayNameFor(profile);

    return (
      <section className="home-hero relative">
        <div className="mx-auto max-w-[90rem] px-4 py-10 sm:px-8 sm:py-12 lg:px-10">
          <div className="max-w-3xl">
            <p className="game-section-title">Welcome back, hunter</p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-wide text-amber sm:text-5xl lg:text-6xl">
              {name}
            </h1>
            <p className="mt-2 text-lg font-medium text-zinc-400">
              The wiki is ready when you are.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              Pick up where you left off — browse fresh guides, check loot tables,
              or plan your next build.{" "}
              <span className="text-zinc-400">
                {totalArticles} articles and counting.
              </span>
            </p>
            <p className="mt-5 text-sm">
              <Link
                href="/account"
                className="font-medium text-amber transition-colors hover:text-zinc-100"
              >
                Your account settings →
              </Link>
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="home-hero relative">
      <div className="mx-auto max-w-[90rem] px-4 py-10 sm:px-8 sm:py-12 lg:px-10">
        <div className="max-w-3xl">
          <p className="game-section-title">Welcome to the wiki</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-widest text-amber sm:text-5xl lg:text-6xl">
            IDLE HUNTER
          </h1>
          <p className="mt-2 text-lg font-medium text-zinc-400">Community wiki</p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Idle Hunter is an idle RPG with MMORPG-style classes, gear, and zone
            progression — your hunter keeps fighting and leveling even while
            you are away.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-500">
            The Idle Hunter Wiki is a community knowledge base for the game.
            Browse guides and articles below, or create an account to help the
            wiki grow over time.
          </p>
        </div>
      </div>
    </section>
  );
}

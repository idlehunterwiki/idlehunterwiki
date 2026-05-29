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
      <section className="home-hero relative border-b border-border">
        <div className="mx-auto max-w-[90rem] px-4 py-10 sm:px-8 sm:py-14 lg:px-10">
          <div className="max-w-2xl">
            <p className="game-section-title">Welcome back</p>
            <h1 className="mt-2 font-display text-4xl font-bold tracking-wide text-amber sm:text-5xl lg:text-6xl">
              {name}
            </h1>
            <p className="mt-1 text-lg font-medium text-zinc-500">Idle Hunter Wiki</p>
            <p className="mt-4 text-muted leading-relaxed">
              Good to see you again. Browse classes, loot, bosses, and guides —{" "}
              {totalArticles} articles in the database.
            </p>
            <p className="mt-3 text-sm">
              <Link href="/account" className="text-amber hover:underline">
                Your account settings →
              </Link>
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="home-hero relative border-b border-border">
      <div className="mx-auto max-w-[90rem] px-4 py-10 sm:px-8 sm:py-14 lg:px-10">
        <div className="max-w-2xl">
          <p className="game-section-title">Welcome to</p>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-widest text-amber sm:text-5xl lg:text-6xl">
            IDLE HUNTER
          </h1>
          <p className="mt-1 text-lg font-medium text-zinc-500">Wiki</p>
          <p className="mt-4 text-muted leading-relaxed">
            Everything about Idle Hunter — classes, loot, bosses, and guides.{" "}
            {totalArticles} articles in the database.
          </p>
        </div>
      </div>
    </section>
  );
}

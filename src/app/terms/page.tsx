import type { Metadata } from "next";
import Link from "next/link";
import { Panel } from "@/components/ui/Panel";

export const metadata: Metadata = {
  title: "Terms & Community Guidelines",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <Link
        href="/sign-up"
        className="text-sm text-zinc-500 transition-colors hover:text-amber"
      >
        ← Back to sign up
      </Link>

      <h1 className="mt-6 font-display text-3xl font-bold text-zinc-100">
        Terms & guidelines
      </h1>
      <p className="mt-2 text-sm text-zinc-500">
        Last updated: May 2026
      </p>

      <Panel className="mt-8 space-y-8 p-6 sm:p-8">
        <section>
          <h2 className="font-display text-xl font-semibold text-zinc-100">
            Terms of Service
          </h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-400">
            <p>
              Idle Hunter Wiki is a community-run knowledge base. By creating an
              account, you agree to use the site lawfully and in good faith.
            </p>
            <p>
              You are responsible for your account credentials and for any
              activity under your account. Do not share your password or attempt
              to access other users&apos; accounts.
            </p>
            <p>
              We may suspend or remove accounts that abuse the wiki, harass
              others, post spam, or attempt to disrupt the service.
            </p>
            <p>
              Content on the wiki is provided for informational purposes. Game
              mechanics and data may change without notice.
            </p>
          </div>
        </section>

        <section id="community-guidelines">
          <h2 className="font-display text-xl font-semibold text-zinc-100">
            Community Guidelines
          </h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-400">
            <p>
              Help keep the hunt welcoming for everyone:
            </p>
            <ul className="list-inside list-disc space-y-2 pl-1">
              <li>Be respectful in discussions and contributions.</li>
              <li>Share accurate, good-faith information about the game.</li>
              <li>Credit sources when you reference external guides or data.</li>
              <li>Do not post hate speech, harassment, or off-topic spam.</li>
              <li>Report mistakes constructively — we&apos;re all learning.</li>
            </ul>
            <p>
              Admins may edit or remove content that violates these guidelines.
              Repeated violations can lead to account restrictions.
            </p>
          </div>
        </section>
      </Panel>
    </div>
  );
}

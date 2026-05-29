import Link from "next/link";
import { Panel } from "@/components/ui/Panel";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[90rem] px-4 py-20 sm:px-6">
      <Panel className="mx-auto max-w-md p-8 text-center">
        <h1 className="font-display text-2xl font-bold text-zinc-100">Page not found</h1>
        <p className="mt-2 text-muted">Check the URL or return to the wiki.</p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-amber px-5 py-2 text-sm font-semibold text-zinc-950 hover:bg-amber-dim"
        >
          Back to home
        </Link>
      </Panel>
    </div>
  );
}

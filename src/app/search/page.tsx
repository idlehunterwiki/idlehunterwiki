import type { Metadata } from "next";
import { WikiSearch } from "@/components/wiki/WikiSearch";
import { Breadcrumbs } from "@/components/wiki/Breadcrumbs";
import { Panel } from "@/components/ui/Panel";
import { getAllArticleSummaries } from "@/lib/wiki";

export const metadata: Metadata = {
  title: "Search",
  description: "Search the Idle Hunter wiki.",
};

export default function SearchPage() {
  const articles = getAllArticleSummaries();

  return (
    <div className="mx-auto max-w-[90rem] px-4 py-8 sm:px-6 sm:py-10">
      <Breadcrumbs title="Search" />
      <h1 className="font-display text-2xl font-bold text-zinc-100">Search</h1>
      <Panel className="mt-6 p-6">
        <WikiSearch articles={articles} autoFocus />
      </Panel>
    </div>
  );
}

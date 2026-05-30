import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export type WikiPublicStats = {
  memberCount: number | null;
};

export async function getWikiPublicStats(): Promise<WikiPublicStats> {
  if (!isSupabaseConfigured()) {
    return { memberCount: null };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("get_public_wiki_stats");

    if (error || !data || typeof data !== "object") {
      return { memberCount: null };
    }

    const row = data as { member_count?: number };
    return {
      memberCount:
        typeof row.member_count === "number" ? row.member_count : null,
    };
  } catch {
    return { memberCount: null };
  }
}

function formatCount(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

interface HomeWikiStatsProps {
  articleCount: number;
  categoryCount: number;
}

export async function HomeWikiStats({
  articleCount,
  categoryCount,
}: HomeWikiStatsProps) {
  const { memberCount } = await getWikiPublicStats();

  const stats = [
    {
      label: "Registered hunters",
      value: memberCount !== null ? formatCount(memberCount) : "—",
      hint:
        memberCount !== null
          ? "Wiki accounts created"
          : "Stats unavailable",
    },
    {
      label: "Wiki articles",
      value: formatCount(articleCount),
      hint: "Guides and reference pages",
    },
    {
      label: "Categories",
      value: formatCount(categoryCount),
      hint: "Topics to browse",
    },
  ];

  return (
    <section aria-labelledby="home-stats-heading">
      <h2 id="home-stats-heading" className="game-section-title mb-4">
        Wiki stats
      </h2>
      <div className="home-wiki-stats game-panel">
        <ul className="home-wiki-stats-list">
          {stats.map((stat) => (
            <li key={stat.label} className="home-wiki-stat">
              <span className="home-wiki-stat-label">{stat.label}</span>
              <span className="home-wiki-stat-value">{stat.value}</span>
              <span className="home-wiki-stat-hint">{stat.hint}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

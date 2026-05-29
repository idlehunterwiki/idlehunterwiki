import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/wiki/Breadcrumbs";
import { WikiSidebar } from "@/components/wiki/WikiSidebar";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { Panel } from "@/components/ui/Panel";
import { ArticleCard } from "@/components/wiki/ArticleCard";
import { markdownToHtml } from "@/lib/markdown";
import {
  getAllSlugs,
  getArticleBySlug,
  getRelatedArticles,
} from "@/lib/wiki";

interface WikiArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: WikiArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Not found" };

  return {
    title: article.frontmatter.title,
    description: article.frontmatter.description,
  };
}

export default async function WikiArticlePage({ params }: WikiArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const html = await markdownToHtml(article.content);
  const related = getRelatedArticles(slug, article.frontmatter.category, 3);

  return (
    <div className="mx-auto max-w-[90rem] px-4 py-8 sm:px-6 sm:py-10">
      <Breadcrumbs
        category={article.frontmatter.category}
        title={article.frontmatter.title}
      />
      <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-6">
        <WikiSidebar
          activeCategory={article.frontmatter.category}
          activeSlug={slug}
        />
        <article>
          <header className="mb-6">
            <CategoryBadge category={article.frontmatter.category} />
            <h1 className="mt-3 font-display text-2xl font-bold text-amber sm:text-3xl">
              {article.frontmatter.title}
            </h1>
            <p className="mt-2 text-muted">{article.frontmatter.description}</p>
            {article.frontmatter.updatedAt && (
              <p className="mt-3 text-xs text-zinc-600">
                Updated {article.frontmatter.updatedAt}
              </p>
            )}
            {article.frontmatter.tags && article.frontmatter.tags.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-2">
                {article.frontmatter.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-md bg-zinc-800 px-2 py-0.5 text-xs text-zinc-500"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </header>

          <Panel className="p-6 sm:p-8">
            <div
              className="wiki-prose"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </Panel>

          {related.length > 0 && (
            <section className="mt-8">
              <h2 className="game-section-title mb-4">Related</h2>
              <div className="grid gap-3 sm:grid-cols-3">
                {related.map((r) => (
                  <ArticleCard key={r.slug} article={r} />
                ))}
              </div>
            </section>
          )}

          <p className="mt-8 text-sm text-zinc-500">
            <Link href={`/category/${article.frontmatter.category}`} className="hover:text-amber">
              ← Back to category
            </Link>
            {" · "}
            <Link href="/wiki" className="hover:text-amber">
              All articles
            </Link>
          </p>
        </article>
      </div>
    </div>
  );
}

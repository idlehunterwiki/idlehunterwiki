import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/wiki/ArticleCard";
import { Breadcrumbs } from "@/components/wiki/Breadcrumbs";
import { WikiSidebar } from "@/components/wiki/WikiSidebar";
import { WIKI_CATEGORIES, getCategoryMeta } from "@/lib/categories";
import { getArticlesByCategory } from "@/lib/wiki";
import type { WikiCategory } from "@/types/wiki";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return WIKI_CATEGORIES.map((c) => ({ category: c.id }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  try {
    const meta = getCategoryMeta(category as WikiCategory);
    return {
      title: meta.label,
      description: meta.description,
    };
  } catch {
    return { title: "Category" };
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categoryId } = await params;

  let meta;
  try {
    meta = getCategoryMeta(categoryId as WikiCategory);
  } catch {
    notFound();
  }

  const articles = getArticlesByCategory(meta.id);

  return (
    <div className="mx-auto max-w-[90rem] px-4 py-8 sm:px-6 sm:py-10">
      <Breadcrumbs category={meta.id} />
      <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-6">
        <WikiSidebar activeCategory={meta.id} />
        <div>
          <p className="game-section-title">{meta.label}</p>
          <h1 className="mt-1 font-display text-2xl font-bold text-zinc-100">
            {meta.label}
          </h1>
          <p className="mt-2 text-muted">{meta.description}</p>
          {articles.length === 0 ? (
            <p className="mt-8 text-muted">No articles in this category yet.</p>
          ) : (
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

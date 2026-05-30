import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type {
  WikiArticle,
  WikiArticleFrontmatter,
  WikiArticleSummary,
  WikiCategory,
} from "@/types/wiki";

const CONTENT_DIR = path.join(process.cwd(), "content", "wiki");

function parseFrontmatter(data: Record<string, unknown>): WikiArticleFrontmatter {
  const category = data.category as WikiCategory;
  const title = String(data.title ?? "");
  const description = String(data.description ?? "");

  if (!title || !description || !category) {
    throw new Error("Article frontmatter requires title, description, and category");
  }

  return {
    title,
    description,
    category,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
    updatedAt: data.updatedAt ? String(data.updatedAt) : undefined,
    featured: Boolean(data.featured),
    order: typeof data.order === "number" ? data.order : undefined,
  };
}

function toSummary(slug: string, frontmatter: WikiArticleFrontmatter): WikiArticleSummary {
  return {
    slug,
    title: frontmatter.title,
    description: frontmatter.description,
    category: frontmatter.category,
    tags: frontmatter.tags ?? [],
    updatedAt: frontmatter.updatedAt,
    featured: frontmatter.featured,
    order: frontmatter.order,
  };
}

function readArticleFile(filename: string): WikiArticle {
  const slug = filename.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = parseFrontmatter(data as Record<string, unknown>);

  return { slug, frontmatter, content };
}

export function getAllArticles(): WikiArticle[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }

  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".md"));

  return files.map(readArticleFile);
}

export function getAllArticleSummaries(): WikiArticleSummary[] {
  return getAllArticles()
    .map((a) => toSummary(a.slug, a.frontmatter))
    .sort((a, b) => {
      const orderA = a.order ?? 999;
      const orderB = b.order ?? 999;
      if (orderA !== orderB) return orderA - orderB;
      return a.title.localeCompare(b.title, "en");
    });
}

export function getArticleBySlug(slug: string): WikiArticle | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return readArticleFile(`${slug}.md`);
}

export function getArticlesByCategory(category: WikiCategory): WikiArticleSummary[] {
  return getAllArticleSummaries().filter((a) => a.category === category);
}

export function getFeaturedArticles(limit = 4): WikiArticleSummary[] {
  const featured = getAllArticleSummaries().filter((a) => a.featured);
  if (featured.length >= limit) {
    return featured.slice(0, limit);
  }

  return getAllArticleSummaries().slice(0, limit);
}

export function getRelatedArticles(
  slug: string,
  category: WikiCategory,
  limit = 4,
): WikiArticleSummary[] {
  return getAllArticleSummaries()
    .filter((a) => a.slug !== slug && a.category === category)
    .slice(0, limit);
}

export function getAllSlugs(): string[] {
  return getAllArticles().map((a) => a.slug);
}

export function getRecentArticles(limit = 6): WikiArticleSummary[] {
  return getAllUpdates().slice(0, limit);
}

export function getAllUpdates(): WikiArticleSummary[] {
  return [...getAllArticleSummaries()].sort((a, b) => {
    const dateA = a.updatedAt ?? "";
    const dateB = b.updatedAt ?? "";
    return dateB.localeCompare(dateA);
  });
}

export function getSpotlightArticle(): WikiArticleSummary | null {
  const featured = getFeaturedArticles(1);
  if (featured.length > 0) return featured[0];
  const all = getAllArticleSummaries();
  return all[0] ?? null;
}

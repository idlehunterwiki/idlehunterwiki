export type WikiCategory =
  | "getting-started"
  | "heroes-classes"
  | "gear-items"
  | "gems"
  | "talents"
  | "hunting-dungeons"
  | "currencies"
  | "game-modes";

export interface WikiArticleFrontmatter {
  title: string;
  description: string;
  category: WikiCategory;
  tags?: string[];
  updatedAt?: string;
  featured?: boolean;
  order?: number;
}

export interface WikiArticle {
  slug: string;
  frontmatter: WikiArticleFrontmatter;
  content: string;
}

export interface WikiArticleSummary {
  slug: string;
  title: string;
  description: string;
  category: WikiCategory;
  tags: string[];
  updatedAt?: string;
  featured?: boolean;
  order?: number;
}

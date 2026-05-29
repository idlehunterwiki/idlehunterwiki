export type WikiCategory =
  | "getting-started"
  | "classes"
  | "equipment"
  | "skills"
  | "world"
  | "bosses"
  | "resources"
  | "guides";

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

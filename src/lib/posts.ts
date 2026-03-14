import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import readingTime from "reading-time";

const contentDirectory = path.join(process.cwd(), "content/blog");

export interface FAQ {
  question: string;
  answer: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  coverImage: string;
  featured: boolean;
  faqs: FAQ[];
  relatedPosts: string[];
  readingTime: string;
}

export interface Post extends PostMeta {
  content: string;
  htmlContent: string;
}

export function getAllPostSlugs(): string[] {
  const files = fs.readdirSync(contentDirectory);
  return files
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .map((file) => file.replace(/\.(md|mdx)$/, ""));
}

export function getPostBySlug(slug: string): Post {
  const fullPath = path.join(contentDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const stats = readingTime(content);

  const processedContent = remark().use(html).processSync(content);
  const htmlContent = processedContent.toString();

  return {
    slug: data.slug || slug,
    title: data.title || "",
    date: data.date || "",
    excerpt: data.excerpt || "",
    category: data.category || "Uncategorized",
    tags: data.tags || [],
    author: data.author || "AutomateNova Team",
    coverImage: data.coverImage || "",
    featured: data.featured || false,
    faqs: data.faqs || [],
    relatedPosts: data.relatedPosts || [],
    readingTime: stats.text,
    content,
    htmlContent,
  };
}

export function getAllPosts(): Post[] {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1));
  return posts;
}

export function getFeaturedPosts(): Post[] {
  return getAllPosts().filter((post) => post.featured);
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  );
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set(posts.map((post) => post.category));
  return Array.from(categories).sort();
}

export function getCategorySlug(category: string): string {
  return category.toLowerCase().replace(/\s+/g, "-");
}

export function getCategoryFromSlug(slug: string): string | undefined {
  const categories = getAllCategories();
  return categories.find((cat) => getCategorySlug(cat) === slug);
}

export function getRelatedPosts(currentSlug: string): Post[] {
  const currentPost = getPostBySlug(currentSlug);
  const relatedSlugs = currentPost.relatedPosts || [];

  const related: Post[] = [];
  for (const slug of relatedSlugs) {
    try {
      related.push(getPostBySlug(slug));
    } catch {
      // Skip if related post doesn't exist
    }
  }

  // If fewer than 3 related posts, fill with same-category posts
  if (related.length < 3) {
    const sameCategoryPosts = getPostsByCategory(currentPost.category)
      .filter(
        (p) =>
          p.slug !== currentSlug && !relatedSlugs.includes(p.slug)
      )
      .slice(0, 3 - related.length);
    related.push(...sameCategoryPosts);
  }

  return related.slice(0, 3);
}

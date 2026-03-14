import Link from "next/link";
import { PostMeta } from "@/lib/posts";

interface PostCardProps {
  post: PostMeta;
  featured?: boolean;
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article
      className={`bg-white rounded-xl border border-[var(--color-border)] overflow-hidden hover:shadow-lg transition-shadow ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <Link
            href={`/category/${post.category.toLowerCase().replace(/\s+/g, "-")}/`}
            className="text-xs font-semibold text-[var(--color-primary)] bg-blue-50 px-2.5 py-1 rounded-full hover:bg-blue-100 transition-colors"
          >
            {post.category}
          </Link>
          <span className="text-xs text-[var(--color-text-muted)]">
            {formattedDate}
          </span>
          <span className="text-xs text-[var(--color-text-muted)]">
            {post.readingTime}
          </span>
        </div>

        <Link href={`/blog/${post.slug}/`} className="group">
          <h2
            className={`font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors mb-2 ${
              featured ? "text-xl md:text-2xl" : "text-lg"
            }`}
          >
            {post.title}
          </h2>
        </Link>

        <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-4">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs text-[var(--color-text-muted)] bg-gray-100 px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          <Link
            href={`/blog/${post.slug}/`}
            className="text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors"
          >
            Read more &rarr;
          </Link>
        </div>
      </div>
    </article>
  );
}

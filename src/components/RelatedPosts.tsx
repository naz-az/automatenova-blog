import Link from "next/link";
import { Post } from "@/lib/posts";

interface RelatedPostsProps {
  posts: Post[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">
        Related Articles
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}/`}
            className="bg-white border border-[var(--color-border)] rounded-lg p-5 hover:shadow-md transition-shadow group"
          >
            <span className="text-xs font-semibold text-[var(--color-primary)] bg-blue-50 px-2 py-0.5 rounded-full">
              {post.category}
            </span>
            <h3 className="font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors mt-3 mb-2 text-sm leading-snug">
              {post.title}
            </h3>
            <p className="text-xs text-[var(--color-text-muted)]">
              {post.readingTime}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

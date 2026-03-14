import { getAllPosts, getFeaturedPosts, getAllCategories, getCategorySlug } from "@/lib/posts";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";
import PostCard from "@/components/PostCard";
import CTABanner from "@/components/CTABanner";
import Link from "next/link";

export default function HomePage() {
  const allPosts = getAllPosts();
  const featuredPosts = getFeaturedPosts();
  const categories = getAllCategories();

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-[var(--color-bg-light)] border-b border-[var(--color-border)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)] mb-4 leading-tight">
            Learn How to Automate Your
            <span className="text-[var(--color-primary)]"> Business with AI</span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-8">
            Expert guides, tutorials, and tool reviews to help you save time,
            reduce costs, and scale with AI-powered automation.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/category/${getCategorySlug(category)}/`}
                className="bg-white border border-[var(--color-border)] text-[var(--color-text-secondary)] px-4 py-2 rounded-full text-sm font-medium hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">
              Featured Guides
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredPosts.slice(0, 4).map((post) => (
                <PostCard key={post.slug} post={post} featured />
              ))}
            </div>
          </section>
        )}

        {/* CTA Banner */}
        <CTABanner />

        {/* All Posts */}
        <section>
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">
            All Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

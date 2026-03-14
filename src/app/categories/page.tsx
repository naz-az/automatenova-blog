import { Metadata } from "next";
import Link from "next/link";
import { getAllCategories, getCategorySlug, getPostsByCategory } from "@/lib/posts";
import { SITE_URL } from "@/lib/constants";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "All Categories - AI Automation Guides",
  description:
    "Browse all categories of AI automation guides. Find tutorials on email marketing, social media, customer service, business tools, and more.",
  openGraph: {
    title: "All Categories - AI Automation Guides",
    description:
      "Browse all categories of AI automation guides.",
    url: `${SITE_URL}/categories/`,
  },
  alternates: {
    canonical: `${SITE_URL}/categories/`,
  },
};

export default function CategoriesPage() {
  const categories = getAllCategories();

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Categories", href: "/categories/" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={breadcrumbItems} />

      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] mb-3">
          All Categories
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)]">
          Browse our AI automation guides by topic
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {categories.map((category) => {
          const posts = getPostsByCategory(category);
          const categorySlug = getCategorySlug(category);

          return (
            <Link
              key={category}
              href={`/category/${categorySlug}/`}
              className="bg-white border border-[var(--color-border)] rounded-xl p-6 hover:shadow-lg transition-shadow group"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                <span className="text-[var(--color-primary)] text-xl font-bold">
                  {category.charAt(0)}
                </span>
              </div>
              <h2 className="text-xl font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors mb-2">
                {category}
              </h2>
              <p className="text-sm text-[var(--color-text-muted)]">
                {posts.length} guide{posts.length !== 1 ? "s" : ""}
              </p>
            </Link>
          );
        })}
      </div>

      <CTABanner />
    </div>
  );
}

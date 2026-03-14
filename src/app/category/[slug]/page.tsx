import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllCategories,
  getCategorySlug,
  getCategoryFromSlug,
  getPostsByCategory,
} from "@/lib/posts";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import PostCard from "@/components/PostCard";
import CTABanner from "@/components/CTABanner";
import Breadcrumbs from "@/components/Breadcrumbs";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((cat) => ({ slug: getCategorySlug(cat) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryFromSlug(slug);
  if (!category) return { title: "Category Not Found" };

  const title = `${category} - AI Automation Guides`;
  const description = `Browse all ${category.toLowerCase()} guides and tutorials. Learn how to automate ${category.toLowerCase()} with AI tools.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/category/${slug}/`,
    },
    alternates: {
      canonical: `${SITE_URL}/category/${slug}/`,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategoryFromSlug(slug);

  if (!category) {
    notFound();
  }

  const posts = getPostsByCategory(category);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Categories", href: "/categories/" },
    { label: category, href: `/category/${slug}/` },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={breadcrumbItems} />

      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] mb-3">
          {category}
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)]">
          {posts.length} guide{posts.length !== 1 ? "s" : ""} on automating{" "}
          {category.toLowerCase()} with AI
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      <CTABanner />
    </div>
  );
}

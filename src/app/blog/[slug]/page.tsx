import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostBySlug, getRelatedPosts } from "@/lib/posts";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import FAQSection from "@/components/FAQSection";
import RelatedPosts from "@/components/RelatedPosts";
import CTABanner from "@/components/CTABanner";
import AdSensePlaceholder from "@/components/AdSensePlaceholder";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = getPostBySlug(slug);
    return {
      title: post.title,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: "article",
        publishedTime: post.date,
        authors: [post.author],
        tags: post.tags,
        url: `${SITE_URL}/blog/${post.slug}/`,
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.excerpt,
      },
      alternates: {
        canonical: `${SITE_URL}/blog/${post.slug}/`,
      },
    };
  } catch {
    return { title: "Post Not Found" };
  }
}

function addHeadingIds(html: string): string {
  return html.replace(
    /<h([23])>(.*?)<\/h[23]>/gi,
    (match, level, text) => {
      const plainText = text.replace(/<[^>]*>/g, "");
      const id = plainText
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      return `<h${level} id="${id}">${text}</h${level}>`;
    }
  );
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug);
  const htmlWithIds = addHeadingIds(post.htmlContent);

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}/`,
    },
    keywords: post.tags.join(", "),
  };

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: post.category, href: `/category/${post.category.toLowerCase().replace(/\s+/g, "-")}/` },
    { label: post.title, href: `/blog/${post.slug}/` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={breadcrumbItems} />

        {/* Post Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-semibold text-[var(--color-primary)] bg-blue-50 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <time
              dateTime={post.date}
              className="text-sm text-[var(--color-text-muted)]"
            >
              {formattedDate}
            </time>
            <span className="text-sm text-[var(--color-text-muted)]">
              {post.readingTime}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            {post.excerpt}
          </p>
        </header>

        {/* Table of Contents */}
        <TableOfContents htmlContent={htmlWithIds} />

        {/* Ad Placeholder - Top */}
        <AdSensePlaceholder slot="top-ad" format="horizontal" />

        {/* Post Content */}
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: htmlWithIds }}
        />

        {/* CTA Banner - Mid Content */}
        <CTABanner variant="compact" />

        {/* Ad Placeholder - Bottom */}
        <AdSensePlaceholder slot="bottom-ad" format="rectangle" />

        {/* FAQ Section */}
        <FAQSection faqs={post.faqs} postTitle={post.title} />

        {/* Tags */}
        <div className="my-8 pt-6 border-t border-[var(--color-border)]">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm text-[var(--color-text-secondary)] bg-gray-100 px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Related Posts */}
        <RelatedPosts posts={relatedPosts} />

        {/* Bottom CTA */}
        <CTABanner />
      </article>
    </>
  );
}

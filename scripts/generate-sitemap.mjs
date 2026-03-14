import fs from "fs";
import path from "path";
import matter from "gray-matter";

const SITE_URL = "https://automatenova.com";
const contentDir = path.join(process.cwd(), "content/blog");

function getAllPosts() {
  const files = fs.readdirSync(contentDir);
  return files
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((f) => {
      const content = fs.readFileSync(path.join(contentDir, f), "utf8");
      const { data } = matter(content);
      return {
        slug: data.slug || f.replace(/\.(md|mdx)$/, ""),
        date: data.date || new Date().toISOString(),
        category: data.category || "Uncategorized",
      };
    });
}

function getCategorySlug(category) {
  return category.toLowerCase().replace(/\s+/g, "-");
}

function generateSitemap() {
  const posts = getAllPosts();
  const categories = [...new Set(posts.map((p) => p.category))];
  const today = new Date().toISOString().split("T")[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}/categories/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${SITE_URL}/about/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`;

  for (const cat of categories) {
    xml += `
  <url>
    <loc>${SITE_URL}/category/${getCategorySlug(cat)}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
  }

  for (const post of posts) {
    xml += `
  <url>
    <loc>${SITE_URL}/blog/${post.slug}/</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
  }

  xml += `
</urlset>`;

  const outDir = path.join(process.cwd(), "out");
  if (!fs.existsSync(outDir)) {
    // Also write to public for dev
    fs.writeFileSync(path.join(process.cwd(), "public", "sitemap.xml"), xml);
  } else {
    fs.writeFileSync(path.join(outDir, "sitemap.xml"), xml);
  }

  // Always write to public for dev
  fs.writeFileSync(path.join(process.cwd(), "public", "sitemap.xml"), xml);

  console.log(`Sitemap generated with ${posts.length} posts and ${categories.length} categories`);
}

generateSitemap();

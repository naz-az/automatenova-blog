interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  htmlContent: string;
}

function extractHeadings(html: string): TOCItem[] {
  const headingRegex = /<h([23])[^>]*>(.*?)<\/h[23]>/gi;
  const headings: TOCItem[] = [];
  let match;

  while ((match = headingRegex.exec(html)) !== null) {
    const text = match[2].replace(/<[^>]*>/g, "");
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    headings.push({
      id,
      text,
      level: parseInt(match[1]),
    });
  }

  return headings;
}

export default function TableOfContents({ htmlContent }: TableOfContentsProps) {
  const headings = extractHeadings(htmlContent);

  if (headings.length < 3) return null;

  return (
    <nav className="bg-gray-50 border border-[var(--color-border)] rounded-lg p-5 my-8">
      <h2 className="font-bold text-[var(--color-text-primary)] mb-3 text-sm uppercase tracking-wider">
        Table of Contents
      </h2>
      <ul className="space-y-1.5">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={heading.level === 3 ? "pl-4" : ""}
          >
            <a
              href={`#${heading.id}`}
              className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

import { FAQ } from "@/lib/posts";

interface FAQSectionProps {
  faqs: FAQ[];
  postTitle: string;
}

export default function FAQSection({ faqs, postTitle }: FAQSectionProps) {
  if (!faqs || faqs.length === 0) return null;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="bg-white border border-[var(--color-border)] rounded-lg group"
          >
            <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors list-none">
              <span>{faq.question}</span>
              <span className="ml-4 text-[var(--color-text-muted)] group-open:rotate-180 transition-transform text-lg">
                &#9660;
              </span>
            </summary>
            <div className="px-5 pb-5">
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </details>
        ))}
      </div>

      {/* FAQ Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </section>
  );
}

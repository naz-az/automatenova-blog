import { FIVERR_CTA_URL, FIVERR_CTA_TEXT } from "@/lib/constants";

interface CTABannerProps {
  variant?: "default" | "compact";
}

export default function CTABanner({ variant = "default" }: CTABannerProps) {
  if (variant === "compact") {
    return (
      <div className="bg-gradient-to-r from-[var(--color-cta-bg)] to-[#7c3aed] rounded-xl p-6 text-center my-8">
        <p className="text-white font-semibold text-lg mb-3">
          {FIVERR_CTA_TEXT}
        </p>
        <a
          href={FIVERR_CTA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-[var(--color-cta-bg)] font-bold px-6 py-2.5 rounded-lg hover:bg-gray-100 transition-colors text-sm"
        >
          Get Started Today
        </a>
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-r from-[var(--color-cta-bg)] to-[#7c3aed] rounded-2xl p-8 md:p-12 text-center my-12">
      <h2 className="text-white text-2xl md:text-3xl font-bold mb-4">
        Ready to Automate Your Business with AI?
      </h2>
      <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
        Stop spending hours on repetitive tasks. Let our AI automation experts set
        up custom workflows that save you 10-20 hours every week.
      </p>
      <a
        href={FIVERR_CTA_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-white text-[var(--color-cta-bg)] font-bold px-8 py-3.5 rounded-lg hover:bg-gray-100 transition-colors text-base shadow-lg"
      >
        Hire Us on Fiverr &rarr;
      </a>
      <p className="text-blue-200 text-sm mt-4">
        Fast delivery. 5-star rated. Money-back guarantee.
      </p>
    </section>
  );
}

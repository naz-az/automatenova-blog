import { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "AutomateNova helps businesses automate with AI. Learn about our mission to make AI automation accessible to every business.",
  openGraph: {
    title: `About Us | ${SITE_NAME}`,
    description:
      "AutomateNova helps businesses automate with AI.",
    url: `${SITE_URL}/about/`,
  },
  alternates: {
    canonical: `${SITE_URL}/about/`,
  },
};

export default function AboutPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about/" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={breadcrumbItems} />

      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] mb-4">
          About {SITE_NAME}
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)]">
          We help businesses automate with AI
        </p>
      </header>

      <div className="prose max-w-none">
        <div className="bg-white border border-[var(--color-border)] rounded-xl p-8 mb-8">
          <h2>Our Mission</h2>
          <p>
            At {SITE_NAME}, we believe every business deserves access to the
            power of AI automation. Our mission is to provide clear, actionable
            guides that help business owners and entrepreneurs automate their
            operations, save time, and scale efficiently.
          </p>

          <h2>What We Do</h2>
          <p>
            We create in-depth tutorials, tool reviews, and step-by-step guides
            covering every aspect of AI-powered business automation:
          </p>
          <ul>
            <li>
              <strong>Email Marketing Automation</strong> - Set up AI-driven email
              campaigns that convert
            </li>
            <li>
              <strong>Social Media Automation</strong> - Schedule, create, and
              analyze content with AI
            </li>
            <li>
              <strong>Customer Service Chatbots</strong> - Build AI chatbots that
              handle support 24/7
            </li>
            <li>
              <strong>Accounting and Finance</strong> - Automate bookkeeping,
              invoicing, and reporting
            </li>
            <li>
              <strong>Workflow Automation</strong> - Connect your tools and
              eliminate manual processes
            </li>
          </ul>

          <h2>Who We Help</h2>
          <p>
            Our guides are designed for small business owners, solopreneurs,
            startup founders, and marketing professionals who want to leverage AI
            without needing a technical background. Whether you are just getting
            started with automation or looking to optimize existing workflows, we
            have guides for every skill level.
          </p>

          <h2>Our Approach</h2>
          <p>
            Every guide we publish follows these principles:
          </p>
          <ul>
            <li>
              <strong>Practical and actionable</strong> - Step-by-step instructions
              you can follow today
            </li>
            <li>
              <strong>Tool-agnostic</strong> - We recommend the best tools for each
              use case, not just one vendor
            </li>
            <li>
              <strong>Up-to-date</strong> - We regularly update our content as AI
              tools evolve
            </li>
            <li>
              <strong>Honest reviews</strong> - We share pros, cons, and real
              pricing for every tool
            </li>
          </ul>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-8 mb-8">
          <h2 className="text-[var(--color-text-primary)]">Need Personalized Help?</h2>
          <p>
            While our guides cover most automation scenarios, sometimes you need
            hands-on expertise. Our team offers professional AI automation setup
            services to help you implement custom solutions tailored to your
            business needs.
          </p>
        </div>
      </div>

      <CTABanner />
    </div>
  );
}

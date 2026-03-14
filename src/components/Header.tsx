import Link from "next/link";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

export default function Header() {
  return (
    <header className="bg-white border-b border-[var(--color-border)] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-[var(--color-primary)] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AN</span>
            </div>
            <div>
              <span className="font-bold text-lg text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
                {SITE_NAME}
              </span>
              <span className="hidden sm:inline text-sm text-[var(--color-text-muted)] ml-2">
                {SITE_TAGLINE}
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/categories/"
              className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
            >
              Categories
            </Link>
            <Link
              href="/about/"
              className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Link
              href="/categories/"
              className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] mr-4"
            >
              Categories
            </Link>
            <Link
              href="/about/"
              className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

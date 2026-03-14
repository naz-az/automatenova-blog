import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <h1 className="text-6xl font-extrabold text-[var(--color-text-primary)] mb-4">
        404
      </h1>
      <h2 className="text-2xl font-bold text-[var(--color-text-secondary)] mb-6">
        Page Not Found
      </h2>
      <p className="text-[var(--color-text-muted)] mb-8 max-w-md mx-auto">
        The page you are looking for does not exist or has been moved. Check the
        URL or browse our guides below.
      </p>
      <Link
        href="/"
        className="inline-block bg-[var(--color-primary)] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors"
      >
        &larr; Back to Home
      </Link>
    </div>
  );
}

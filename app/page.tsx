import Link from "next/link";

export default function HomePage() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center rounded-3xl border border-white/10 bg-gradient-to-b from-[#1a1a1a] to-black px-6 text-center">
      <p className="rounded-full border border-white/20 px-4 py-1 text-xs uppercase tracking-widest text-gray-300">
        Next.js + PayPal Subscriptions
      </p>

      <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">
        Monetize your app with recurring billing in minutes
      </h1>

      <p className="mt-6 max-w-2xl text-base text-gray-300 sm:text-lg">
        This demo showcases a complete flow: pricing page, PayPal subscription checkout,
        verification, and protected dashboard access.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/pricing"
          className="rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200"
        >
          View Pricing
        </Link>
        <Link
          href="/dashboard"
          className="rounded-xl border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
        >
          Go to Dashboard
        </Link>
        <Link
          href="/signup"
          className="rounded-xl border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
        >
          Create Account
        </Link>
      </div>
    </section>
  );
}
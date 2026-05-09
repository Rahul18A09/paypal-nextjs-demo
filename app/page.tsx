import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <h1 className="text-6xl font-bold">
        PayPal SaaS Demo
      </h1>

      <p className="mt-5 text-gray-500">
        Premium subscription demo using PayPal and Next.js.
      </p>

      <Link
        href="/pricing"
        className="mt-8 bg-white text-black px-6 py-3 rounded-xl font-semibold"
      >
        View Pricing
      </Link>
    </div>
  );
}
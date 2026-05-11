import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b">
      <h1 className="text-2xl font-bold">
        PayPal Demo
      </h1>

      <div className="flex gap-5">
        <Link href="/">
          Home
        </Link>

        <Link href="/pricing">
          Pricing
        </Link>

        <Link href="/dashboard">
          Dashboard
        </Link>
      </div>
    </nav>
  );
}
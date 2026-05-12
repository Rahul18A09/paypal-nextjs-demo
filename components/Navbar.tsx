// import Link from "next/link";

// export default function Navbar() {
//   return (
//     <nav className="flex items-center justify-between px-8 py-4 border-b">
//       <h1 className="text-2xl font-bold">
//         PayPal Demo
//       </h1>

//       <div className="flex gap-5">
//         <Link href="/">
//           Home
//         </Link>

//         <Link href="/pricing">
//           Pricing
//         </Link>

//         <Link href="/dashboard">
//           Dashboard
//         </Link>
//       </div>
//     </nav>
//   );
// }


"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();

  return (
    <nav className="border-b border-white/10 bg-black/80 text-white backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-8">
        {/* LOGO */}
        <Link
          href="/"
          className="text-xl font-bold sm:text-2xl"
        >
          PayPal Demo
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="hover:text-gray-300 transition">
            Home
          </Link>

          <Link href="/pricing" className="hover:text-gray-300 transition">
            Pricing
          </Link>

          <Link href="/dashboard" className="hover:text-gray-300 transition">
            Dashboard
          </Link>

          {status === "loading" ? (
            <span className="text-sm text-gray-400">
              Checking...
            </span>
          ) : session ? (
            <>
              <span className="max-w-40 truncate text-sm text-gray-300">
                {session.user?.email}
              </span>
              <button
                onClick={() =>
                  signOut({ callbackUrl: "/" })
                }
                className="rounded-lg border border-white/20 px-3 py-2 text-sm hover:bg-white/10"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-black hover:bg-gray-200"
            >
              Login
            </Link>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1"
        >
          <span className="w-6 h-[2px] bg-white"></span>
          <span className="w-6 h-[2px] bg-white"></span>
          <span className="w-6 h-[2px] bg-white"></span>
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="bg-black px-4 pb-4 md:hidden">
          <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="hover:text-gray-300 transition"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>

          <Link
            href="/pricing"
            className="hover:text-gray-300 transition"
            onClick={() => setIsOpen(false)}
          >
            Pricing
          </Link>

          <Link
            href="/dashboard"
            className="hover:text-gray-300 transition"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>

            {session ? (
              <button
                onClick={() => {
                  setIsOpen(false);
                  signOut({ callbackUrl: "/" });
                }}
                className="w-fit rounded-lg border border-white/20 px-3 py-2 text-sm"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => {
                  setIsOpen(false);
                }}
                className="w-fit rounded-lg bg-white px-3 py-2 text-sm font-semibold text-black"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
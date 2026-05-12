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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b bg-black text-white">
      <div className="flex items-center justify-between px-4 sm:px-8 py-4">
        {/* LOGO */}
        <h1 className="text-xl sm:text-2xl font-bold">
          PayPal Demo
        </h1>

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
        <div className="md:hidden flex flex-col px-4 pb-4 gap-4 bg-black">
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
        </div>
      )}
    </nav>
  );
}
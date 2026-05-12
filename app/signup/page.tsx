"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setNameError(null);
    setEmailError(null);
    setPasswordError(null);

    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();
    let hasValidationError = false;

    if (!normalizedName || normalizedName.length < 2) {
      setNameError("Name must be at least 2 characters.");
      hasValidationError = true;
    }

    if (!normalizedEmail) {
      setEmailError("Email is required.");
      hasValidationError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setEmailError("Please enter a valid email address.");
      hasValidationError = true;
    }

    if (!normalizedPassword) {
      setPasswordError("Password is required.");
      hasValidationError = true;
    } else if (normalizedPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      hasValidationError = true;
    }

    if (hasValidationError) {
      return;
    }

    setLoading(true);

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: normalizedName,
        email: normalizedEmail,
        password: normalizedPassword,
      }),
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data?.message || "Signup failed. Please try again.");
      return;
    }

    setMessage("Account created successfully. Redirecting to login...");
    setTimeout(() => {
      router.push("/login");
    }, 1200);
  };

  return (
    <section className="mx-auto max-w-md rounded-2xl border border-white/10 bg-[#0f0f0f] p-6 sm:p-8">
      <h1 className="text-2xl font-semibold">Create account</h1>
      <p className="mt-2 text-sm text-gray-300">Start your subscription journey.</p>

      <form className="mt-6 space-y-4" onSubmit={handleSignup}>
        <div>
          <label className="mb-1 block text-sm text-gray-300">Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-lg border border-white/20 bg-black px-3 py-2 outline-none focus:border-white/40"
          />
          {nameError ? (
            <p className="mt-1 text-xs text-red-300">{nameError}</p>
          ) : null}
        </div>

        <div>
          <label className="mb-1 block text-sm text-gray-300">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-lg border border-white/20 bg-black px-3 py-2 outline-none focus:border-white/40"
          />
          {emailError ? (
            <p className="mt-1 text-xs text-red-300">{emailError}</p>
          ) : null}
        </div>

        <div>
          <label className="mb-1 block text-sm text-gray-300">Password</label>
          <input
            type="password"
            minLength={8}
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-lg border border-white/20 bg-black px-3 py-2 outline-none focus:border-white/40"
          />
          {passwordError ? (
            <p className="mt-1 text-xs text-red-300">{passwordError}</p>
          ) : null}
        </div>

        {error ? (
          <p className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {error}
          </p>
        ) : null}

        {message ? (
          <p className="rounded-md border border-green-500/40 bg-green-500/10 px-3 py-2 text-sm text-green-300">
            {message}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-white px-4 py-2 font-semibold text-black disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Sign up"}
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-300">
        Already have an account?{" "}
        <Link href="/login" className="text-white underline">
          Login
        </Link>
      </p>
    </section>
  );
}

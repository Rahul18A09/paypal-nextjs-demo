"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setEmailError(null);
    setPasswordError(null);

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();
    let hasValidationError = false;

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
    }

    if (hasValidationError) {
      return;
    }

    setLoading(true);

    const result = await signIn("credentials", {
      email: normalizedEmail,
      password: normalizedPassword,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <section className="mx-auto max-w-md rounded-2xl border border-white/10 bg-[#0f0f0f] p-6 sm:p-8">
      <h1 className="text-2xl font-semibold">Login</h1>
      <p className="mt-2 text-sm text-gray-300">
        Access your dashboard and manage your subscription.
      </p>

      <form className="mt-6 space-y-4" onSubmit={handleLogin}>
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

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-white px-4 py-2 font-semibold text-black disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-300">
        New user?{" "}
        <Link href="/signup" className="text-white underline">
          Create an account
        </Link>
      </p>
    </section>
  );
}

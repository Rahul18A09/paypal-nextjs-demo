"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  plan: "free" | "premium";
  subscriptionStatus: "active" | "cancelled" | "none";
  paypalSubscriptionId?: string;
};

export default function DashboardSubscriptionActions({
  plan,
  subscriptionStatus,
  paypalSubscriptionId,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCancel = async () => {
    if (!paypalSubscriptionId) {
      setError("Missing subscription ID. Please re-subscribe from pricing.");
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    const response = await fetch("/api/paypal/cancel-subscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subscriptionID: paypalSubscriptionId,
      }),
    });

    setLoading(false);

    if (!response.ok) {
      const data = await response.json();
      setError(data?.error || "Failed to cancel subscription.");
      return;
    }

    setMessage("Cancellation requested. Status may update in a few moments.");
    router.refresh();
  };

  return (
    <div className="mt-4 space-y-3">
      <Link
        href="/pricing"
        className="inline-block rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10"
      >
        {plan === "premium" ? "Manage Plan" : "Upgrade Plan"}
      </Link>

      {subscriptionStatus === "active" ? (
        <button
          onClick={handleCancel}
          disabled={loading}
          className="ml-3 rounded-lg border border-red-500/40 px-4 py-2 text-sm text-red-300 hover:bg-red-500/10 disabled:opacity-60"
        >
          {loading ? "Cancelling..." : "Cancel Subscription"}
        </button>
      ) : null}

      {message ? (
        <p className="rounded-md border border-green-500/40 bg-green-500/10 px-3 py-2 text-xs text-green-300">
          {message}
        </p>
      ) : null}

      {error ? (
        <p className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}

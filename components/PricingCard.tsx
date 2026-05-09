"use client";

import SubscriptionButton from "./SubscriptionButton";

export default function PricingCard() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 w-[400px] shadow-2xl">
      <h1 className="text-4xl font-bold">
        Premium Plan
      </h1>

      <p className="mt-4 text-zinc-400">
        Includes 3-day free trial
      </p>

      <div className="mt-6">
        <span className="text-5xl font-bold">
          $11.99
        </span>

        <span className="text-zinc-400 text-lg">
          {" "}
          / month
        </span>
      </div>

      <div className="mt-8 space-y-3 text-zinc-300">
        <p>✅ Unlimited Access</p>

        <p>✅ Premium Features</p>

        <p>✅ Priority Support</p>

        <p>✅ Cancel Anytime</p>
      </div>

      <div className="mt-10">
        <SubscriptionButton />
      </div>
    </div>
  );
}
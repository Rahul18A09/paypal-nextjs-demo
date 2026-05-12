"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

type Props = {
  planId: string;
};

export default function SubscriptionButton({ planId }: Props) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      <PayPalScriptProvider
        options={{
          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
          vault: true,
          intent: "subscription",
        }}
      >
        <PayPalButtons
          createSubscription={(_, actions) => {
            setErrorMessage(null);

            return actions.subscription.create({
              plan_id: planId,
            });
          }}
          onApprove={async (data) => {
            const response = await fetch("/api/paypal/verify-subscription", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                subscriptionID: data.subscriptionID,
              }),
            });

            if (!response.ok) {
              const errorBody = await response.json();
              setErrorMessage(
                errorBody?.error || "Verification failed. Please try again."
              );
              return;
            }

            router.push(`/success?subscription_id=${data.subscriptionID}`);
          }}
          onError={() => {
            setErrorMessage("Payment failed. Please retry.");
          }}
        />
      </PayPalScriptProvider>

      {errorMessage && (
        <p className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

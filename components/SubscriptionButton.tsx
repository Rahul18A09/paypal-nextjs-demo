"use client";

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

type Props = {
  planId: string;
};

export default function SubscriptionButton({ planId }: Props) {
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
        vault: true,
        intent: "subscription",
      }}
    >
      <PayPalButtons
        createSubscription={(data, actions) => {
          console.log(
            "PLAN ID:",

            planId,
          );

          return actions.subscription.create({
  plan_id: planId,
});
        }}
        onApprove={async (data) => {
          await fetch("/api/paypal/verify-subscription", {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              subscriptionID: data.subscriptionID,
            }),
          });

          alert("Subscription Activated!");
        }}
        onError={(err) => {
          console.log("PAYPAL ERROR:", err);

          alert(JSON.stringify(err));
        }}
      />

      {/* Paypal payment button */}
    </PayPalScriptProvider>
  );
}

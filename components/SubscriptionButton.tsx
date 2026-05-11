"use client";

import {
  PayPalButtons,
  PayPalScriptProvider,
} from "@paypal/react-paypal-js";

export default function SubscriptionButton() {
  return (
    <PayPalScriptProvider
      options={{
        clientId:
          process.env
            .NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
        vault: true,
        intent: "subscription",
      }}
    >
      <PayPalButtons
        createSubscription={(data, actions) => {
  console.log(
    "PLAN ID:",
    process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID
  );

  return actions.subscription.create({
    plan_id:
      process.env
        .NEXT_PUBLIC_PAYPAL_PLAN_ID!,
  });
}}

        onApprove={async (data) => {
          await fetch(
            "/api/paypal/verify-subscription",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                subscriptionID:
                  data.subscriptionID,
              }),
            }
          );

          alert(
            "Subscription Activated!"
          );
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
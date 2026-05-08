"use client";

import {
  PayPalButtons,
  PayPalScriptProvider,
} from "@paypal/react-paypal-js";

const PLAN_ID =
  "P-6PR49564B1288471TNH6ZEZA";

export default function SubscriptionButton() {
  return (
    <PayPalScriptProvider
      options={{
        clientId:
          process.env
            .NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",

        vault: true,

        intent: "subscription",
      }}
    >



      {/* paypal button here */}

      {/* <PayPalButtons
        createSubscription={(
          data,
          actions
        ) => {
          return actions.subscription.create({
            plan_id:" P-7SL62049N76752743NH6WW7Y",
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
          console.log(err);

          alert(
            "Something went wrong"
          );
        }}
      /> */}


 <PayPalButtons
  createSubscription={(data, actions) => {
    console.log("Creating subscription...");

    return actions.subscription
      .create({
        plan_id:
          "P-6PR49564B1288471TNH6ZEZA",
      })
      .then((subscriptionId) => {
        console.log(
          "Subscription ID:",
          subscriptionId
        );

        return subscriptionId;
      })
      .catch((err) => {
        console.error(
          "PAYPAL SUBSCRIPTION ERROR:",
          err
        );

        alert(JSON.stringify(err));

        throw err;
      });
  }}

  onApprove={(data) => {
    console.log("APPROVED:", data);

    alert(
      "User subscribed successfully!"
    );
  }}

  onError={(err) => {
    console.error(
      "PAYPAL BUTTON ERROR:",
      err
    );

    alert(
      "PayPal Error: " +
        JSON.stringify(err)
    );
  }}
/>


    </PayPalScriptProvider>
  );
}
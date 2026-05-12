"use client";

import { useEffect, useState } from "react";

type SubscriptionDetails = {
  id?: string;
  status?: string;
};

export default function SuccessPage() {
  const [details, setDetails] =
    useState<SubscriptionDetails | null>(
      null
    );

  const getSubscriptionDetails = async (
    subscriptionId: string
  ) => {
    try {
      const response =
        await fetch(
          "/api/paypal/subscription-details",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              subscriptionID:
                subscriptionId,
            }),
          }
        );

      const data =
        await response.json();

      setDetails(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const params =
      new URLSearchParams(
        window.location.search
      );

    const subscriptionId =
      params.get("subscription_id");

    if (subscriptionId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      getSubscriptionDetails(
        subscriptionId
      );
    }
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent:
          "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <h1>
        Subscription Successful
      </h1>

      {details && (
        <>
          <p>
            Status:
            {" "}
            {details.status}
          </p>

          <p>
            Subscription ID:
            {" "}
            {details.id}
          </p>

          <a href="/dashboard">
            Go to Dashboard
          </a>
        </>
      )}
    </div>
  );
}
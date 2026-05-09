"use client";

import { useState } from "react";

export default function DashboardPage() {
  const [
    subscriptionId,
    setSubscriptionId,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  async function cancelSubscription() {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/paypal/cancel-subscription",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            subscriptionId,
          }),
        }
      );

      const data =
        await response.json();

      if (data.success) {
        alert(
          "Subscription cancelled"
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        padding: "40px",
      }}
    >
      <h1>Dashboard</h1>

      <p>
        Premium User Dashboard
      </p>

      <div
        style={{
          marginTop: "30px",
          display: "flex",
          flexDirection:
            "column",
          gap: "10px",
          maxWidth: "400px",
        }}
      >
        <input
          type="text"
          placeholder="Subscription ID"
          value={
            subscriptionId
          }
          onChange={(e) =>
            setSubscriptionId(
              e.target.value
            )
          }
          style={{
            padding: "12px",
          }}
        />

        <button
          onClick={
            cancelSubscription
          }
          disabled={loading}
          style={{
            padding:
              "12px 24px",
            cursor: "pointer",
          }}
        >
          {loading
            ? "Cancelling..."
            : "Cancel Subscription"}
        </button>
      </div>
    </div>
  );
}
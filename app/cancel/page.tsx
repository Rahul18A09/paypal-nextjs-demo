export default function CancelPage() {
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
        Subscription Cancelled
      </h1>

      <p>
        You cancelled the
        PayPal subscription
        process.
      </p>

      <a href="/pricing">
        Back to Pricing
      </a>
    </div>
  );
}
import SubscriptionButton from "@/components/SubscriptionButton";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="border p-10 rounded-xl shadow-xl">
        <h1 className="text-3xl font-bold mb-4">
          Premium Membership
        </h1>

        <p className="mb-3">
          3 Days Free Trial
        </p>

        <p className="mb-5">
          Then $7.99/month
        </p>

        <SubscriptionButton />
      </div>
    </main>
  );
}
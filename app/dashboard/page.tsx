import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import DashboardSubscriptionActions from "@/components/DashboardSubscriptionActions";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <section className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-[#0f0f0f] p-8 text-center">
        <h1 className="text-2xl font-semibold">
          Login Required
        </h1>
        <p className="mt-3 text-gray-300">
          Please login to access your subscription dashboard.
        </p>
        <Link
          href="/pricing"
          className="mt-6 inline-block rounded-xl bg-white px-5 py-2 font-semibold text-black"
        >
          View Pricing
        </Link>
      </section>
    );
  }

  await connectDB();
  const user = await User.findOne({
    email: session.user?.email,
  }).lean<{
    plan?: "free" | "premium";
    subscriptionStatus?: "active" | "cancelled" | "none";
    trialEnd?: Date;
    paypalSubscriptionId?: string;
  } | null>();

  return (
    <section className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-2xl border border-white/10 bg-[#0f0f0f] p-6">
        <p className="text-sm text-gray-400">
          Signed in as
        </p>
        <p className="mt-2 break-all text-lg font-semibold">
          {session.user?.email}
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0f0f0f] p-6">
        <p className="text-sm text-gray-400">
          Subscription
        </p>
        <p className="mt-2 text-lg font-semibold capitalize">
          {user?.plan ?? "free"}
        </p>
        <p className="mt-1 text-sm text-gray-300 capitalize">
          Status: {user?.subscriptionStatus ?? "none"}
        </p>
        {user?.trialEnd ? (
          <p className="mt-1 text-xs text-gray-400">
            Trial ends: {new Date(user.trialEnd).toLocaleDateString()}
          </p>
        ) : null}
        <DashboardSubscriptionActions
          plan={user?.plan ?? "free"}
          subscriptionStatus={user?.subscriptionStatus ?? "none"}
          paypalSubscriptionId={user?.paypalSubscriptionId}
        />
      </div>
    </section>
  );
}
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    await connectDB();

    const subscriptionId =
      body.resource?.id;

    const eventType = body.event_type;

    const user = await User.findOne({
      paypalSubscriptionId: subscriptionId,
    });

    if (!user) {
      return NextResponse.json({
        success: false,
      });
    }

    if (
      eventType ===
      "BILLING.SUBSCRIPTION.ACTIVATED"
    ) {
      user.plan = "premium";
      user.subscriptionStatus = "active";

      const now = new Date();

      const trialEnd = new Date();
      trialEnd.setDate(now.getDate() + 3);

      user.trialStart = now;
      user.trialEnd = trialEnd;
    }

    if (
      eventType ===
      "BILLING.SUBSCRIPTION.CANCELLED"
    ) {
      user.plan = "free";
      user.subscriptionStatus = "cancelled";
    }

    await user.save();

    return NextResponse.json({
      received: true,
    });
  } catch {
    return NextResponse.json(
      { error: "Webhook failed" },
      { status: 500 }
    );
  }
}
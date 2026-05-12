import { generateAccessToken } from "@/lib/paypal";
import { PAYPAL_BASE_URL } from "@/lib/env";

import { connectDB } from "@/lib/mongodb";

import Subscription from "@/models/Subscription";

import { NextResponse } from "next/server";

export async function POST(
  req: Request
) {
  try {
    const { subscriptionID } =
      await req.json();
    const normalizedSubscriptionId =
      subscriptionID?.trim();

    if (!normalizedSubscriptionId) {
      return NextResponse.json(
        {
          success: false,
          error: "subscriptionID is required",
        },
        { status: 400 }
      );
    }

    // CONNECT DATABASE
    await connectDB();

    // PAYPAL ACCESS TOKEN
    const token =
      await generateAccessToken();

    // VERIFY SUBSCRIPTION
    const response = await fetch(
      `${PAYPAL_BASE_URL}/v1/billing/subscriptions/${normalizedSubscriptionId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data =
      await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error:
            data?.message ||
            "Failed to verify subscription",
        },
        { status: response.status }
      );
    }

    console.log(
      "PAYPAL SUBSCRIPTION:",
      data
    );

    // SAVE TO DATABASE
    const savedSubscription =
      await Subscription.create({
        subscriptionId: data.id,

        planId: data.plan_id,

        status: data.status,

        email:
          data.subscriber
            ?.email_address,

        payerId:
          data.subscriber
            ?.payer_id,

        startTime:
          data.start_time,

        nextBillingTime:
          data.billing_info
            ?.next_billing_time,
      });

    console.log(
      "SAVED:",
      savedSubscription
    );

    return NextResponse.json({
      success: true,

      data: savedSubscription,
    });
  } catch (error) {
    console.log(
      "VERIFY ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        error:
          "Verification failed",
      },

      { status: 500 }
    );
  }
}
import { generateAccessToken } from "@/lib/paypal";
import { PAYPAL_BASE_URL } from "@/lib/env";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
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

    const accessToken =
      await generateAccessToken();

    const response = await fetch(
      `${PAYPAL_BASE_URL}/v1/billing/subscriptions/${normalizedSubscriptionId}/cancel`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          Authorization: `Bearer ${accessToken}`,
        },

        body: JSON.stringify({
          reason:
            "User requested cancellation",
        }),
      }
    );

    if (!response.ok) {
      const data = await response.json();

      return NextResponse.json(
        {
          success: false,
          error:
            data?.message ||
            "Cancellation failed",
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Subscription cancelled",
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error:
          "Cancellation failed",
      },
      { status: 500 }
    );
  }
}
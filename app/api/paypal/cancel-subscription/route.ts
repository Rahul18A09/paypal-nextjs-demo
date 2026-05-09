import { generateAccessToken } from "@/lib/paypal";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { subscriptionID } =
      await req.json();

    const accessToken =
      await generateAccessToken();

    await fetch(
      `${process.env.PAYPAL_BASE_URL}/v1/billing/subscriptions/${subscriptionID}/cancel`,
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

    return NextResponse.json({
      success: true,
      message:
        "Subscription cancelled",
    });
  } catch (error) {
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
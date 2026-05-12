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
      `${PAYPAL_BASE_URL}/v1/billing/subscriptions/${normalizedSubscriptionId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error:
            data?.message ||
            "Failed to fetch subscription",
        },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to fetch subscription",
      },
      { status: 500 }
    );
  }
}
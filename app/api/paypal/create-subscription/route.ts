import { generateAccessToken } from "@/lib/paypal";
import { PAYPAL_BASE_URL } from "@/lib/env";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { planId } = await req.json();
    const normalizedPlanId = planId?.trim();

    if (!normalizedPlanId) {
      return NextResponse.json(
        { error: "planId is required" },
        { status: 400 }
      );
    }

    const accessToken = await generateAccessToken();

    const response = await fetch(
      `${PAYPAL_BASE_URL}/v1/billing/subscriptions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan_id: normalizedPlanId,

          application_context: {
            brand_name: "Your SaaS",
            user_action: "SUBSCRIBE_NOW",
            return_url: "http://localhost:3000/dashboard",
            cancel_url: "http://localhost:3000/pricing",
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            data?.message ||
            "Subscription creation failed",
        },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Subscription creation failed" },
      { status: 500 }
    );
  }
}
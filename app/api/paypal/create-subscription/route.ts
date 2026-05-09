import { generateAccessToken } from "@/lib/paypal";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { planId } = await req.json();

    const accessToken = await generateAccessToken();

    const response = await fetch(
      "https://api-m.sandbox.paypal.com/v1/billing/subscriptions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan_id: planId,

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

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Subscription creation failed" },
      { status: 500 }
    );
  }
}
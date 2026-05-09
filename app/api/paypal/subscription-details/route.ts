import { generateAccessToken } from "@/lib/paypal";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { subscriptionID } =
      await req.json();

    const accessToken =
      await generateAccessToken();

    const response = await fetch(
      `${process.env.PAYPAL_BASE_URL}/v1/billing/subscriptions/${subscriptionID}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
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
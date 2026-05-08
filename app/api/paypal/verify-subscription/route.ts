import { generateAccessToken } from "@/lib/paypal";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { subscriptionID } =
      await req.json();

    const token =
      await generateAccessToken();

    const response = await fetch(
      `${process.env.PAYPAL_BASE_URL}/v1/billing/subscriptions/${subscriptionID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    /*
      SAVE IN DATABASE HERE
    */

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          "Verification failed",
      },
      { status: 500 }
    );
  }
}
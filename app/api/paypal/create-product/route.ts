import { generateAccessToken } from "@/lib/paypal";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const token =
      await generateAccessToken();

    const response = await fetch(
      `${process.env.PAYPAL_BASE_URL}/v1/catalogs/products`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: "Premium Plan",
          description:
            "Premium Subscription",
          type: "SERVICE",
          category: "SOFTWARE",
        }),
      }
    );

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Product creation failed" },
      { status: 500 }
    );
  }
}
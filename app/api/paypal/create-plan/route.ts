import { generateAccessToken } from "@/lib/paypal";
import { PAYPAL_BASE_URL } from "@/lib/env";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    
    const token =
      await generateAccessToken();

    const response = await fetch(
      `${PAYPAL_BASE_URL}/v1/billing/plans`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id:
          "PROD-3EW82341K77349916",
          name: "Premium Plan",
          description:
            "3 day trial then monthly billing",



            // billing cycle

          // billing_cycles: [
          //   {
          //     frequency: {
          //       interval_unit: "DAY",
          //       interval_count: 1,
          //     },
          //     tenure_type: "TRIAL",
          //     sequence: 1,
          //     total_cycles: 3,

          //     pricing_scheme: {
          //       fixed_price: {
          //         value: "0",
          //         currency_code: "USD",
          //       },
          //     },
          //   },

          //   {
          //     frequency: {
          //       interval_unit: "MONTH",
          //       interval_count: 1,
          //     },

          //     tenure_type: "REGULAR",
          //     sequence: 2,
          //     total_cycles: 0,

          //     pricing_scheme: {
          //       fixed_price: {
          //         value: "9.99",
          //         currency_code: "USD",
          //       },
          //     },
          //   },
          // ],




billing_cycles: [
  {
    frequency: {
      interval_unit: "DAY",
      interval_count: 3,
    },

    tenure_type: "TRIAL",

    sequence: 1,

    total_cycles: 1,

    pricing_scheme: {
      fixed_price: {
        value: "0",
        currency_code: "USD",
      },
    },
  },

  {
    frequency: {
      interval_unit: "MONTH",
      interval_count: 1,
    },

    tenure_type: "REGULAR",

    sequence: 2,

    total_cycles: 0,

    pricing_scheme: {
      fixed_price: {
        value: "11.99",
        currency_code: "USD",
      },
    },
  },
],

          payment_preferences: {
            auto_bill_outstanding: true,
            payment_failure_threshold: 3,
          },
        }),
      }
    );

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
  console.error("CREATE PLAN ERROR:", error);

  return Response.json(
    {
      error: "Plan creation failed",
      details:
        error instanceof Error
          ? error.message
          : "Unknown error",
    },
    { status: 500 }
  );
  }
}
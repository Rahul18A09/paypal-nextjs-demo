import {
  PAYPAL_BASE_URL,
  PAYPAL_CLIENT_ID,
  PAYPAL_CLIENT_SECRET,
} from "./env";

import { PayPalAccessTokenResponse } from "@/types/paypal";

export async function generateAccessToken(): Promise<string> {
  try {
    const auth = Buffer.from(
      `${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`
    ).toString("base64");

    const response = await fetch(
      `${PAYPAL_BASE_URL}/v1/oauth2/token`,
      {
        method: "POST",

        headers: {
          Authorization: `Basic ${auth}`,

          "Content-Type":
            "application/x-www-form-urlencoded",
        },

        body:
          "grant_type=client_credentials",
      }
    );

    if (!response.ok) {
      throw new Error(
        "Failed to generate access token"
      );
    }

    const data: PayPalAccessTokenResponse =
      await response.json();

    return data.access_token;
  } catch (error) {
    console.log(
      "PAYPAL TOKEN ERROR:",
      error
    );

    throw error;
  }
}

export async function paypalRequest(
  endpoint: string,
  method = "GET",
  body?: any
) {
  try {
    const accessToken =
      await generateAccessToken();

    const response = await fetch(
      `${PAYPAL_BASE_URL}${endpoint}`,
      {
        method,

        headers: {
          "Content-Type":
            "application/json",

          Authorization: `Bearer ${accessToken}`,
        },

        body: body
          ? JSON.stringify(body)
          : undefined,
      }
    );

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "PayPal Request Failed"
      );
    }

    return data;
  } catch (error) {
    console.log(
      "PAYPAL REQUEST ERROR:",
      error
    );

    throw error;
  }
}
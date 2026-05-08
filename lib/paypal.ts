import { PayPalAccessTokenResponse } from "@/types/paypal";

const CLIENT_ID =
  process.env.PAYPAL_CLIENT_ID!;

const CLIENT_SECRET =
  process.env.PAYPAL_CLIENT_SECRET!;

const BASE =
  process.env.PAYPAL_BASE_URL!;

export async function generateAccessToken(): Promise<string> {
  const auth = Buffer.from(
    `${CLIENT_ID}:${CLIENT_SECRET}`
  ).toString("base64");

  const response = await fetch(
    `${BASE}/v1/oauth2/token`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type":
          "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    }
  );

  const data: PayPalAccessTokenResponse =
    await response.json();

  return data.access_token;
}
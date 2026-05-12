function requireEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}`
    );
  }

  return value;
}

export const PAYPAL_CLIENT_ID =
  requireEnv("PAYPAL_CLIENT_ID");

export const PAYPAL_CLIENT_SECRET =
  requireEnv("PAYPAL_CLIENT_SECRET");

export const PAYPAL_BASE_URL =
  requireEnv("PAYPAL_BASE_URL");

export const MONGODB_URI =
  requireEnv("MONGODB_URI");

export const NEXT_PUBLIC_PAYPAL_CLIENT_ID =
  requireEnv("NEXT_PUBLIC_PAYPAL_CLIENT_ID");

export const NEXT_PUBLIC_PAYPAL_PLAN_ID =
  requireEnv("NEXT_PUBLIC_PAYPAL_PLAN_ID");
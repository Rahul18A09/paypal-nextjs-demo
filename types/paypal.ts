export interface PayPalAccessTokenResponse {
  scope: string;

  access_token: string;

  token_type: string;

  app_id: string;

  expires_in: number;

  nonce: string;
}

export interface PayPalSubscriptionResponse {
  id: string;

  plan_id: string;

  status: string;

  start_time: string;

  subscriber?: {
    email_address?: string;

    payer_id?: string;
  };

  billing_info?: {
    next_billing_time?: string;
  };
}

export interface PayPalProductResponse {
  id: string;

  name: string;

  description: string;

  type: string;

  category: string;
}

export interface PayPalPlanResponse {
  id: string;

  product_id: string;

  name: string;

  status: string;
}
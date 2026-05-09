export interface SubscriptionDocument {
  subscriptionId: string;

  planId: string;

  status: string;

  email: string;

  payerId: string;

  startTime: string;

  nextBillingTime: string;
}

export interface UserDocument {
  name?: string;

  email: string;

  isPremium: boolean;

  subscriptionId?: string;
}
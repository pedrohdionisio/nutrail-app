export interface IBillingSessionResponse {
  url: string;
}

export type CheckoutOutcome = 'ACTIVATED' | 'PENDING' | 'CANCELED';

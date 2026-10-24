import { api } from 'data/config/api';
import type { IBillingSessionResponse } from '../types/BillingTypes';

async function createCheckout(): Promise<string> {
  const { data } = await api.post<IBillingSessionResponse>('/billing/checkout');

  return data.url;
}

async function createPortal(): Promise<string> {
  const { data } = await api.post<IBillingSessionResponse>('/billing/portal');

  return data.url;
}

export const BillingService = {
  createCheckout,
  createPortal
};

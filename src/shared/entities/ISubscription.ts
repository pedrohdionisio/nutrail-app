import type { Plan } from 'shared/constants/subscription';

export interface ISubscription {
  plan: Plan;
  cancelAt: string | null;
  available: boolean;
}

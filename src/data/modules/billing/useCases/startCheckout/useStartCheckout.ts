import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BillingBrowser } from 'data/libs/BillingBrowser';
import { ME_QUERY_KEYS } from 'data/modules/me/keys/MeKeys';
import type { IMe } from 'shared/entities/IMe';
import { BILLING_MUTATION_KEYS } from '../../keys/BillingKeys';
import { BillingService } from '../../services/BillingService';
import type { CheckoutOutcome } from '../../types/BillingTypes';
import { waitForSubscriptionChange } from '../../utils/waitForSubscriptionChange';
import type { IStartCheckoutParams } from './UseStartCheckoutTypes';

export function useStartCheckout() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [BILLING_MUTATION_KEYS.START_CHECKOUT],
    mutationFn: async ({ subscription }: IStartCheckoutParams): Promise<CheckoutOutcome> => {
      const url = await BillingService.createCheckout();
      const result = await BillingBrowser.open(url);

      if (result === 'canceled') {
        return 'CANCELED';
      }

      const me = await waitForSubscriptionChange(subscription);
      queryClient.setQueryData<IMe>([ME_QUERY_KEYS.ME], me);

      return me.subscription.plan === 'PREMIUM' ? 'ACTIVATED' : 'PENDING';
    }
  });

  return {
    startCheckout: mutateAsync,
    isStartingCheckout: isPending
  };
}

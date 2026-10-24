import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BillingBrowser } from 'data/libs/BillingBrowser';
import { ME_QUERY_KEYS } from 'data/modules/me/keys/MeKeys';
import type { IMe } from 'shared/entities/IMe';
import { BILLING_MUTATION_KEYS } from '../../keys/BillingKeys';
import { BillingService } from '../../services/BillingService';
import { waitForSubscriptionChange } from '../../utils/waitForSubscriptionChange';
import type { IOpenBillingPortalParams } from './UseOpenBillingPortalTypes';

export function useOpenBillingPortal() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [BILLING_MUTATION_KEYS.OPEN_BILLING_PORTAL],
    mutationFn: async ({ subscription }: IOpenBillingPortalParams) => {
      const url = await BillingService.createPortal();
      await BillingBrowser.open(url);

      const me = await waitForSubscriptionChange(subscription);
      queryClient.setQueryData<IMe>([ME_QUERY_KEYS.ME], me);
    }
  });

  return {
    openBillingPortal: mutateAsync,
    isOpeningBillingPortal: isPending
  };
}

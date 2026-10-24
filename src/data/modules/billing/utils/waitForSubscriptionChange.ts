import { MeService } from 'data/modules/me/services/MeService';
import type { IMe } from 'shared/entities/IMe';
import type { ISubscription } from 'shared/entities/ISubscription';
import { sleep } from 'shared/utils/sleep';

const POLLING_INTERVAL_MS = 1000;
const MAX_POLLING_ATTEMPTS = 6;

function hasChanged(previous: ISubscription, current: ISubscription) {
  return previous.plan !== current.plan || previous.cancelAt !== current.cancelAt;
}

export async function waitForSubscriptionChange(previous: ISubscription): Promise<IMe> {
  let me = await MeService.get();

  for (let attempt = 1; attempt < MAX_POLLING_ATTEMPTS; attempt++) {
    if (hasChanged(previous, me.subscription)) {
      return me;
    }

    await sleep(POLLING_INTERVAL_MS);
    me = await MeService.get();
  }

  return me;
}

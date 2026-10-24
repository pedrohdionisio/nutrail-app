import { openAuthSessionAsync } from 'expo-web-browser';

const RETURN_URL = 'nutrail://billing';

export type BillingBrowserResult = 'success' | 'canceled';

async function open(url: string): Promise<BillingBrowserResult> {
  const result = await openAuthSessionAsync(url, RETURN_URL, { preferEphemeralSession: true });

  if (result.type === 'success' && result.url.includes('status=success')) {
    return 'success';
  }

  return 'canceled';
}

export const BillingBrowser = {
  open
};

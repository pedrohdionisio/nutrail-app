import type * as WebBrowser from 'expo-web-browser';
import type { AuthSessionOpenOptions, WebBrowserAuthSessionResult } from 'expo-web-browser';

const actualWebBrowser = jest.requireActual<typeof WebBrowser>('expo-web-browser');

interface IAuthSessionCall {
  url: string;
  redirectUrl: string | null | undefined;
  options: AuthSessionOpenOptions | undefined;
}

export const authSessionCalls: IAuthSessionCall[] = [];
export const authSessionReturn: { current: string | null } = { current: null };

export function resetWebBrowser() {
  authSessionCalls.length = 0;
  authSessionReturn.current = null;
}

export const webBrowserMock = {
  ...actualWebBrowser,
  openAuthSessionAsync: async (
    url: string,
    redirectUrl?: string | null,
    options?: AuthSessionOpenOptions
  ): Promise<WebBrowserAuthSessionResult> => {
    authSessionCalls.push({ url, redirectUrl, options });

    if (authSessionReturn.current === null) {
      return { type: actualWebBrowser.WebBrowserResultType.DISMISS };
    }

    return { type: 'success', url: authSessionReturn.current };
  }
};

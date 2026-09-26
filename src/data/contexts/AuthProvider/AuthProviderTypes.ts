import type { IAuthTokensResponse } from 'data/modules/auth/types/AuthTypes';

export interface IAuthContextValue {
  signedIn: boolean;
  activateSession: (tokens: IAuthTokensResponse) => Promise<void>;
  enterApp: () => void;
  signOut: () => Promise<void>;
}

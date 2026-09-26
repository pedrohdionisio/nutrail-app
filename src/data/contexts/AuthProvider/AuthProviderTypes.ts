import type { IAuthTokensResponse } from 'data/modules/auth/types/AuthTypes';

export interface IAuthContextValue {
  signedIn: boolean;
  startSession: (tokens: IAuthTokensResponse) => Promise<void>;
  signOut: () => Promise<void>;
}

import { publicApi } from 'data/config/api';
import type {
  IAuthTokensResponse,
  IRefreshTokenPayload,
  IRequestPasswordResetPayload,
  IResetPasswordPayload,
  ISignInPayload
} from 'data/modules/auth/types/AuthTypes';

async function signIn(payload: ISignInPayload): Promise<IAuthTokensResponse> {
  const { data } = await publicApi.post<IAuthTokensResponse>('/auth/sign-in', payload);

  return data;
}

async function refreshToken(payload: IRefreshTokenPayload): Promise<IAuthTokensResponse> {
  const { data } = await publicApi.post<IAuthTokensResponse>('/auth/refresh-token', payload);

  return data;
}

async function requestPasswordReset(payload: IRequestPasswordResetPayload): Promise<void> {
  await publicApi.post('/auth/forgot-password', payload);
}

async function resetPassword(payload: IResetPasswordPayload): Promise<void> {
  await publicApi.post('/auth/forgot-password/confirm', payload);
}

export const AuthService = {
  signIn,
  refreshToken,
  requestPasswordReset,
  resetPassword
};

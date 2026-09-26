export interface IAuthTokensResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ISignInPayload {
  email: string;
  password: string;
}

export interface IRefreshTokenPayload {
  refreshToken: string;
}

export interface IRequestPasswordResetPayload {
  email: string;
}

export interface IResetPasswordPayload {
  email: string;
  code: string;
  password: string;
}

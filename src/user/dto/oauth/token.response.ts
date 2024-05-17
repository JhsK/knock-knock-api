export interface OAuthTokenResponse {
  accessToken: string;
  expiresAt: number;
  refreshToken: string;
  refreshTokenExpiresAt: number;
}

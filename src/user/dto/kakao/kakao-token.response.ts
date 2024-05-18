export interface KakaoTokenResponse {
  access_token: string;
  token_type: 'bearer';
  refresh_token: string;
  expires_in: number;
  scope: string;
  refresh_token_expires_in: number;
}

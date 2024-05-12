export interface KakaoToken {
  token_type: 'bearer';
  access_token: string;
  id_token?: string;
  expires_at: number;
  refresh_token: string;
  refresh_token_expires_in: number;
  scope?: string;
}

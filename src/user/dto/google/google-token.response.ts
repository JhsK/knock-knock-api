export interface GoogleTokenResponse {
  access_token: string;
  token_type: 'Bearer';
  refresh_token: string;
  expires_in: number;
  scope: string;
}

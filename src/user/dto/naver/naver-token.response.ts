export interface NaverTokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: 'Bearer' | 'MAC';
  expires_in: number;
  error: string;
  error_description: string;
}

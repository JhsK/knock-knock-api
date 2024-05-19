import { OAuthTokenResponse } from '../dto/oauth/token.response';
import { OAuthUserResponse } from '../dto/oauth/user.response';

export interface OAuthAttributes<T> {
  getToken?: (loginDto: T) => Promise<OAuthTokenResponse>;
  getUser: (accessToken: string) => Promise<OAuthUserResponse>;
}

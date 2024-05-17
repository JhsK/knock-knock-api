import { Injectable } from '@nestjs/common';
import { OAuthAttributes } from '../interface/oauth.interface';
import { OAuthTokenResponse } from '../dto/oauth/token.response';
import { OAuthUserResponse } from '../dto/oauth/user.response';

@Injectable()
export class NaverService implements OAuthAttributes<any> {
  getToken: (loginDto: any) => Promise<OAuthTokenResponse>;
  getUser: (accessToken: string) => Promise<OAuthUserResponse>;
}

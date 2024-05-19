import { BadRequestException, Injectable } from '@nestjs/common';
import { NaverLoginRequest } from '../dto/naver/naver-login.request';
import { NaverUserResponse } from '../dto/naver/naver-user.response';
import { OAuthUserResponse } from '../dto/oauth/user.response';
import { OAuthAttributes } from '../interface/oauth.interface';

@Injectable()
export class NaverService implements OAuthAttributes<NaverLoginRequest> {
  async getUser(accessToken: string): Promise<OAuthUserResponse> {
    try {
      const response = await fetch('https://openapi.naver.com/v1/nid/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        method: 'GET',
      });

      const data: NaverUserResponse = await response.json();

      return {
        nickname: data.response.nickname,
        registeredAt: new Date().toString(),
        socialId: data.response.id,
        type: 'naver',
      };
    } catch (err) {
      throw new BadRequestException();
    }
  }
}

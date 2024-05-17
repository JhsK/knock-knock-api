import { BadRequestException, Injectable } from '@nestjs/common';
import { KakaoLoginRequest } from '../dto/kakao/kakao-login.request';
import { OAuthAttributes } from '../interface/oauth.interface';
import { OAuthTokenResponse } from '../dto/oauth/token.response';
import { OAuthUserResponse } from '../dto/oauth/user.response';

@Injectable()
export class KakaoService implements OAuthAttributes<KakaoLoginRequest> {
  async getToken(
    kakaoLoginRequest: KakaoLoginRequest,
  ): Promise<OAuthTokenResponse> {
    const { code } = kakaoLoginRequest;

    try {
      const response = await fetch('https://kauth.kakao.com/oauth/token', {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        method: 'POST',
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: process.env.KAKAO_CLIENT_ID,
          redirect_uri: process.env.KAKAO_REDIRECT_URI,
          code,
        }).toString(),
      });

      const data = await response.json();
      return data;
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async getUser(accessToken: string): Promise<OAuthUserResponse> {
    try {
      const response = await fetch('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        method: 'GET',
      });

      const data = await response.json();
      return data;
    } catch (err) {
      throw new BadRequestException();
    }
  }
}

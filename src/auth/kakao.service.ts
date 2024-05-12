import { BadRequestException, Injectable } from '@nestjs/common';
import { KakaoLoginDto } from './dto/kakao/kakao-login.dto';
import { KakaoToken } from './types/kakao';

@Injectable()
export class KakaoService {
  async getKakaoToken(kakaoLoginDto: KakaoLoginDto): Promise<KakaoToken> {
    const { code } = kakaoLoginDto;

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
}

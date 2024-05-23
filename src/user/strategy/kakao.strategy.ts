import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { KakaoUserProfile } from '../types/kakao';
import { SocialEnum } from '../types/user';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_SECRET_ID,
      callbackURL: process.env.KAKAO_REDIRECT_URI,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: KakaoUserProfile,
    done: (_, object) => object,
  ) {
    const { id, displayName, provider, _json } = profile;

    done(null, {
      id,
      name: displayName,
      accessToken,
      socialType: SocialEnum.kakao,
      registerAt: _json.connected_at,
    });
  }
}

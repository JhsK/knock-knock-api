import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { KakaoUserProfile } from '../types/kakao';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
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
      provider,
      registerAt: _json.connected_at,
    });
  }
}

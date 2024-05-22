import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver';
import { NaverUserProfile } from './types/naver';
import { SocialEnum } from './types/user';

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor() {
    super({
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: process.env.NAVER_REDIRECT_URI,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: NaverUserProfile,
    done: (error: any, user?: any, info?: any) => void,
  ) {
    const { id, displayName, provider } = profile;
    done(null, {
      id,
      name: displayName,
      accessToken,
      socialType: SocialEnum.naver,
      registerAt: new Date().toString(),
    });
  }
}

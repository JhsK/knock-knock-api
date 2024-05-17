import { BadRequestException, Injectable } from '@nestjs/common';
import { KakaoService } from './services/kakao.service';
import { NaverService } from './services/naver.service';
import { GoogleService } from './services/google.service';
import { OAuthAttributes } from './interface/oauth.interface';
import { KakaoLoginRequest } from './dto/kakao/kakao-login.request';
import { SocialEnum } from './types/user';

type OAuthAttributesMap = {
  kakao: OAuthAttributes<KakaoLoginRequest>;
  naver: OAuthAttributes<any>;
  google: OAuthAttributes<any>;
};

@Injectable()
export class OAuthFactory {
  constructor(
    private readonly kakaoService: KakaoService,
    private readonly naverService: NaverService,
    private readonly googleService: GoogleService,
  ) {}

  createOAuthService<T extends keyof typeof SocialEnum>(
    type: T,
  ): OAuthAttributesMap[T] {
    switch (type) {
      case 'kakao':
        return this.kakaoService;
      case 'naver':
        return this.naverService;
      case 'google':
        return this.googleService;
      default:
        throw new BadRequestException('Invalid OAuth type');
    }
  }
}

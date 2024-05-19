import { BadRequestException, Injectable } from '@nestjs/common';
import { KakaoService } from './services/kakao.service';
import { NaverService } from './services/naver.service';
import { GoogleService } from './services/google.service';
import { OAuthAttributes } from './interface/oauth.interface';
import { KakaoLoginRequest } from './dto/kakao/kakao-login.request';
import { NaverLoginRequest } from './dto/naver/naver-login.request';

type OAuthAttributesMap = {
  kakao: OAuthAttributes<KakaoLoginRequest>;
  naver: OAuthAttributes<NaverLoginRequest>;
  google: OAuthAttributes<any>;
};

@Injectable()
export class OAuthFactory {
  constructor(
    private readonly kakaoService: KakaoService,
    private readonly naverService: NaverService,
    private readonly googleService: GoogleService,
  ) {}

  createOAuthService<T extends keyof OAuthAttributesMap>(
    type: T,
  ): OAuthAttributesMap[T] {
    switch (type) {
      case 'kakao':
        return this.kakaoService as OAuthAttributesMap[T];
      case 'naver':
        return this.naverService as OAuthAttributesMap[T];
      case 'google':
        return this.googleService as OAuthAttributesMap[T];
      default:
        throw new BadRequestException('Invalid OAuth type');
    }
  }
}

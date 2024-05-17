import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KakaoLoginRequest } from '../dto/kakao/kakao-login.request';
import { OAuthFactory } from '../oauth.factory';
import { SocialEnum } from '../types/user';
import { User } from '../user.entity';

@Injectable()
export class OAuthService {
  constructor(
    private readonly oauthFactory: OAuthFactory,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createKakaoUser(kakaoLoginRequest: KakaoLoginRequest) {
    const kakaoService = await this.oauthFactory.createOAuthService('kakao');
    const kakaoToken = await kakaoService.getToken(kakaoLoginRequest);

    const { nickname, registerdAt, socialId, type } =
      await kakaoService.getUser(kakaoToken.accessToken);

    if (!registerdAt || !nickname) {
      throw new NotFoundException();
    }

    const socialIdAsString = String(socialId);
    const socialType = SocialEnum[type];

    const user = await this.userRepository.findOne({
      where: { socialId: socialIdAsString, socialType },
    });

    if (user) {
      return user;
    }

    const createUser = await this.userRepository.create({
      nickname,
      socialId: socialIdAsString,
      socialType,
      registerAt: registerdAt,
    });

    await this.userRepository.save(createUser);
    return {
      accessToken: kakaoToken.accessToken,
      accessToeknExpiresAt: kakaoToken.expiresAt,
      refreshToken: kakaoToken.refreshToken,
      refreshTokenExpiresAt: kakaoToken.refreshTokenExpiresAt,
    };
  }
}

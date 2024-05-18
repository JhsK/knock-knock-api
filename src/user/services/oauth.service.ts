import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KakaoLoginRequest } from '../dto/kakao/kakao-login.request';
import { OAuthFactory } from '../oauth.factory';
import { SocialEnum } from '../types/user';
import { User } from '../user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class OAuthService {
  constructor(
    private readonly oauthFactory: OAuthFactory,
    private readonly jwtService: JwtService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createKakaoUser(kakaoLoginRequest: KakaoLoginRequest) {
    const kakaoService = await this.oauthFactory.createOAuthService('kakao');
    const kakaoToken = await kakaoService.getToken(kakaoLoginRequest);

    const { nickname, registeredAt, socialId, type } =
      await kakaoService.getUser(kakaoToken.accessToken);

    if (!registeredAt || !nickname) {
      throw new NotFoundException();
    }

    const socialIdAsString = String(socialId);
    const socialType = SocialEnum[type];

    const user = await this.userRepository.findOne({
      where: { socialId: socialIdAsString, socialType },
    });

    if (user) {
      const payload = { userId: user.id, socialType };
      const accessToken = await this.jwtService.signAsync(payload);
      const refreshToken = await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
      });

      return { accessToken, refreshToken };
    }

    const createUser = await this.userRepository.create({
      nickname,
      socialId: socialIdAsString,
      socialType,
      registerAt: registeredAt,
    });

    await this.userRepository.save(createUser);

    const payload = { userId: createUser.id, socialType };
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}

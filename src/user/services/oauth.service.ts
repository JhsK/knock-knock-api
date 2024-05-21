import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { KakaoLoginRequest } from '../dto/kakao/kakao-login.request';
import { NaverLoginRequest } from '../dto/naver/naver-login.request';
import { OAuthFactory } from '../oauth.factory';
import { SocialEnum } from '../types/user';
import { User } from '../user.entity';
import { GoogleLoginRequest } from '../dto/google/google-login.request';

@Injectable()
export class OAuthService {
  constructor(
    private readonly oauthFactory: OAuthFactory,
    private readonly jwtService: JwtService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource,
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

    this.dataSource.transaction(async (manager) => {
      const userRepository = manager.getRepository(User);
      const user = await userRepository.findOne({
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

      const createUser = await userRepository.create({
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
    });
  }

  async createNaverUser(naverLoginRequest: NaverLoginRequest) {
    const naverService = await this.oauthFactory.createOAuthService('naver');
    const naverUser = await naverService.getUser(naverLoginRequest.accessToken);

    if (!naverUser) {
      throw new NotFoundException();
    }

    const { nickname, socialId, registeredAt, type } = naverUser;
    const socialType = SocialEnum[type];

    return this.dataSource.transaction(async (manager) => {
      const userRepository = manager.getRepository(User);
      const user = await userRepository.findOne({
        where: { socialId: socialId as string, socialType },
      });

      if (user) {
        const payload = { userId: user.id, socialType };
        const accessToken = await this.jwtService.signAsync(payload);
        const refreshToken = await this.jwtService.signAsync(payload, {
          expiresIn: '7d',
        });

        return { accessToken, refreshToken };
      }
      const createUser = await userRepository.create({
        nickname,
        socialId: socialId as string,
        socialType,
        registerAt: registeredAt,
      });

      await userRepository.save(createUser);

      const payload = { userId: createUser.id, socialType };
      const accessToken = await this.jwtService.signAsync(payload);
      const refreshToken = await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
      });

      return {
        accessToken,
        refreshToken,
      };
    });
  }

  async createGoogleUser(googleLoginRequest: GoogleLoginRequest) {
    const googleService = await this.oauthFactory.createOAuthService('google');
    const googleToken = await googleService.getToken(googleLoginRequest);
    console.log(googleToken);
  }
}

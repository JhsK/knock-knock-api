import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KakaoLoginDto } from '../dto/kakao/kakao-login.dto';
import { SocialEnum } from '../types/user';
import { User } from '../user.entity';
import { GoogleService } from './google.service';
import { KakaoService } from './kakao.service';
import { NaverService } from './naver.service';

@Injectable()
export class OAuthService {
  constructor(
    private readonly kakaoService: KakaoService,
    private readonly googleService: GoogleService,
    private readonly naverService: NaverService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createKakaoUser(KakaoLoginDto: KakaoLoginDto) {
    const kakaoToken = await this.kakaoService.getKakaoToken(KakaoLoginDto);
    const { id, connected_at, properties } =
      await this.kakaoService.getKakaoUser(kakaoToken.access_token);

    if (!id || !properties) {
      throw new NotFoundException();
    }

    const socialId = String(id);
    const socialType = SocialEnum.kakao;

    const user = await this.userRepository.findOne({
      where: { socialId, socialType },
    });

    if (user) {
      return user;
    }

    const createUser = await this.userRepository.create({
      nickname: properties.nickname,
      socialId,
      socialType,
      registerAt: connected_at,
    });

    await this.userRepository.save(createUser);

    return createUser;
  }
}

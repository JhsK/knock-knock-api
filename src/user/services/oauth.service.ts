import { Injectable } from '@nestjs/common';
import { KakaoService } from './kakao.service';
import { GoogleService } from './google.service';
import { NaverService } from './naver.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { KakaoUser } from '../types/kakao';
import { SocialEnum } from '../types/user';

@Injectable()
export class OAuthService {
  constructor(
    private readonly kakaoService: KakaoService,
    private readonly googleService: GoogleService,
    private readonly naverService: NaverService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createKakaoUser(kakaoUser: KakaoUser) {
    const { id, connected_at, properties } = kakaoUser;
    const user = await this.userRepository.findOne({
      where: { socialId: id, socialType: SocialEnum.kakao },
    });

    if (user) {
      return user;
    }

    const createUser = await this.userRepository.create({
      nickname: properties.nickname,
      socialId: id,
      socialType: SocialEnum.kakao,
      registerAt: connected_at,
    });

    await this.userRepository.save(createUser);

    return createUser;
  }
}

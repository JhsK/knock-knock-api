import { Injectable } from '@nestjs/common';
import { KakaoLoginDto } from './dto/kakao/kakao-login.dto';

@Injectable()
export class AuthService {
  getKakaoToken(kakaoLoginDto: KakaoLoginDto) {
    console.log(kakaoLoginDto);
  }
}

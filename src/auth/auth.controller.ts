import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { KakaoLoginDto } from './dto/kakao/kakao-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/kakao-login')
  postKakaoLogin(@Body() body: KakaoLoginDto) {
    this.authService.getKakaoToken(body);
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { KakaoLoginDto } from './dto/kakao/kakao-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/kakao-login')
  async postKakaoLogin(@Body() body: KakaoLoginDto) {
    const data = await this.authService.getKakaoToken(body);

    return data;
  }
}

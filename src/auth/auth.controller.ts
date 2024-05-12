import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { KakaoLoginDto } from './dto/kakao/kakao-login.dto';
import { KakaoService } from './kakao.service';

@Controller('auth')
export class AuthController {
  constructor(private kakaoService: KakaoService) {}

  @Post('/kakao-login')
  @UsePipes(ValidationPipe)
  async postKakaoLogin(@Body() body: KakaoLoginDto) {
    const data = await this.kakaoService.getKakaoToken(body);

    return data;
  }
}

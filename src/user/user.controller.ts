import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './services/user.service';
import { OAuthService } from './services/oauth.service';
import { KakaoLoginRequest } from './dto/kakao/kakao-login.request';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly oauthService: OAuthService,
  ) {}

  @Post('/kakao-login')
  @UsePipes(ValidationPipe)
  async postKakaoLogin(@Body() body: KakaoLoginRequest) {
    const tokens = await this.oauthService.createKakaoUser(body);

    return tokens;
  }
}

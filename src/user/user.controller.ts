import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './services/user.service';
import { KakaoLoginDto } from './dto/kakao/kakao-login.dto';
import { OAuthService } from './services/oauth.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly oauthService: OAuthService,
  ) {}

  @Post('/kakao-login')
  @UsePipes(ValidationPipe)
  async postKakaoLogin(@Body() body: KakaoLoginDto) {
    const user = await this.oauthService.createKakaoUser(body);

    return user;
  }
}

import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './services/user.service';
import { OAuthService } from './services/oauth.service';
import { KakaoLoginRequest } from './dto/kakao/kakao-login.request';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  private logger = new Logger('UserController');
  constructor(
    private readonly userService: UserService,
    private readonly oauthService: OAuthService,
  ) {}

  @Post('/kakao-login')
  @UsePipes(ValidationPipe)
  async postKakaoLogin(@Body() body: KakaoLoginRequest) {
    const token = await this.oauthService.createKakaoUser(body);

    this.logger.verbose(
      `사용자가 카카오 회원가입 또는 로그인을 진행하였습니다`,
    );
    return token;
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async getUserById(@Param('id') id: string) {
    console.log(id);
  }
}

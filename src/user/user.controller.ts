import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { GetUser } from './decorator/get-user.decorator';
import { GoogleLoginRequest } from './dto/google/google-login.request';
import { NaverLoginRequest } from './dto/naver/naver-login.request';
import { OAuthService } from './services/oauth.service';
import { UserService } from './services/user.service';
import { KakaoLoginRequest } from './dto/kakao/kakao-login.request';

@Controller('user')
export class UserController {
  private logger = new Logger('UserController');
  constructor(
    private readonly userService: UserService,
    private readonly oauthService: OAuthService,
  ) {}

  @Post('/naver-login')
  @UsePipes(ValidationPipe)
  async postNaverLogin(@Body() body: NaverLoginRequest) {
    const token = await this.oauthService.createNaverUser(body);

    this.logger.verbose(
      `사용자가 네이버 회원가입 또는 로그인을 진행하였습니다`,
    );
    return token;
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async getUserById(@Param('id') id: string) {
    console.log(id);
  }

  @Get('/kakao-login/callback')
  @UseGuards(AuthGuard('kakao'))
  async kakaoCallback(
    @GetUser() user: KakaoLoginRequest,
    @Res() res: Response,
  ) {
    const userToken = await this.oauthService.createGoogleUser(user);
    console.log('userToken', userToken);
    return res.redirect('http://localhost:3000');
  }

  @Get('/kakao-login')
  @UseGuards(AuthGuard('kakao'))
  @UsePipes(ValidationPipe)
  async kakaoLogin() {}

  @Get('/google-login/callback')
  @UseGuards(AuthGuard('google'))
  @UsePipes(ValidationPipe)
  async googleLoginCallback(
    @GetUser() user: GoogleLoginRequest,
    @Res() res: Response,
  ) {
    const userToken = await this.oauthService.createGoogleUser(user);
    console.log(userToken);
    return res.redirect(`http://localhost:3000`);
  }

  @Get('/google-login')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {}
}

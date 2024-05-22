import {
  Controller,
  Get,
  Logger,
  Param,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { GetUser } from './decorator/get-user.decorator';
import { GoogleLoginRequest } from './dto/google/google-login.request';
import { KakaoLoginRequest } from './dto/kakao/kakao-login.request';
import { NaverLoginRequest } from './dto/naver/naver-login.request';
import { OAuthService } from './services/oauth.service';
import { UserService } from './services/user.service';

@Controller('user')
export class UserController {
  private logger = new Logger('UserController');
  constructor(
    private readonly userService: UserService,
    private readonly oauthService: OAuthService,
  ) {}

  @Get('/kakao-login/callback')
  @UseGuards(AuthGuard('kakao'))
  async kakaoCallback(
    @GetUser() user: KakaoLoginRequest,
    @Res() res: Response,
  ) {
    const userToken = await this.oauthService.createGoogleUser(user);
    console.log('userToken', userToken);

    this.logger.verbose(
      `사용자가 카카오 회원가입 또는 로그인을 진행하였습니다`,
    );

    return res.redirect('http://localhost:3000');
  }

  @Get('/kakao-login')
  @UseGuards(AuthGuard('kakao'))
  @UsePipes(ValidationPipe)
  async kakaoLogin() {}

  @Get('/naver-login/callback')
  @UseGuards(AuthGuard('naver'))
  async naverCallback(
    @GetUser() user: NaverLoginRequest,
    @Res() res: Response,
  ) {
    const userToken = await this.oauthService.createNaverUser(user);
    console.log('userToken', userToken);

    this.logger.verbose(
      `사용자가 네이버 회원가입 또는 로그인을 진행하였습니다`,
    );

    return res.redirect('http://localhost:3000');
  }

  @Get('/naver-login')
  @UseGuards(AuthGuard('naver'))
  @UsePipes(ValidationPipe)
  async naverLogin() {}

  @Get('/google-login/callback')
  @UseGuards(AuthGuard('google'))
  @UsePipes(ValidationPipe)
  async googleLoginCallback(
    @GetUser() user: GoogleLoginRequest,
    @Res() res: Response,
  ) {
    const userToken = await this.oauthService.createGoogleUser(user);
    console.log(userToken);

    this.logger.verbose(`사용자가 구글 회원가입 또는 로그인을 진행하였습니다`);

    return res.redirect(`http://localhost:3000`);
  }

  @Get('/google-login')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {}

  @Get(':id')
  @UseGuards(AuthGuard())
  async getUserById(@Param('id') id: string) {
    console.log(id);
  }
}

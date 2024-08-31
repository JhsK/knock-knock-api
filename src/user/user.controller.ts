import {
  Controller,
  Get,
  Logger,
  Param,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { GetUser } from './decorator/get-user.decorator';
import { LoginRequest } from './dto/request/login.request';
import { UserService } from './user.service';
import { REFRESH_TOKEN_COOKIE_EXPIRES_IN } from 'src/constant';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  private readonly REDIRECT_CLIENT_URL: string;
  private logger = new Logger('UserController');

  constructor(private readonly userService: UserService) {
    this.REDIRECT_CLIENT_URL = `${process.env.SERVICE_URL}/login-redirect`;
  }

  @Get('/kakao-login/callback')
  @UseGuards(AuthGuard('kakao'))
  async kakaoCallback(
    @GetUser() loginRequest: LoginRequest,
    @Res() res: Response,
  ) {
    const userToken = await this.userService.login(loginRequest);

    this.logger.verbose(
      `사용자가 카카오 회원가입 또는 로그인을 진행하였습니다`,
    );

    res.cookie('refreshToken', userToken.refreshToken, {
      httpOnly: true,
      secure: false, // https에서만 작동, 필요에 따라 false로 설정
      maxAge: REFRESH_TOKEN_COOKIE_EXPIRES_IN,
    });

    res.redirect(
      `${this.REDIRECT_CLIENT_URL}?accessToken=${userToken.accessToken}`,
    );
  }

  @Get('/kakao-login')
  @UseGuards(AuthGuard('kakao'))
  @UsePipes(ValidationPipe)
  async kakaoLogin() {}

  @Get('/naver-login/callback')
  @UseGuards(AuthGuard('naver'))
  async naverCallback(
    @GetUser() loginRequest: LoginRequest,
    @Res() res: Response,
  ) {
    const userToken = await this.userService.login(loginRequest);

    this.logger.verbose(
      `사용자가 네이버 회원가입 또는 로그인을 진행하였습니다`,
    );

    res.cookie('refreshToken', userToken.refreshToken, {
      httpOnly: true,
      secure: false, // https에서만 작동, 필요에 따라 false로 설정
      maxAge: REFRESH_TOKEN_COOKIE_EXPIRES_IN,
    });

    res.redirect(
      `${this.REDIRECT_CLIENT_URL}?accessToken=${userToken.accessToken}`,
    );
  }

  @Get('/naver-login')
  @UseGuards(AuthGuard('naver'))
  @UsePipes(ValidationPipe)
  async naverLogin() {}

  @Get('/google-login/callback')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(
    @GetUser() loginRequest: LoginRequest,
    @Res() res: Response,
  ) {
    const userToken = await this.userService.login(loginRequest);

    this.logger.verbose(`사용자가 구글 회원가입 또는 로그인을 진행하였습니다`);

    res.cookie('refreshToken', userToken.refreshToken, {
      httpOnly: true,
      secure: false, // https에서만 작동, 필요에 따라 false로 설정
      maxAge: REFRESH_TOKEN_COOKIE_EXPIRES_IN,
    });

    res.redirect(
      `${this.REDIRECT_CLIENT_URL}?accessToken=${userToken.accessToken}`,
    );
  }

  @Get('/google-login')
  @UseGuards(AuthGuard('google'))
  @UsePipes(ValidationPipe)
  async googleLogin() {}

  @Get('/refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  async refresh(
    @GetUser() user: User,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const accessToken = await this.userService.refreshAccessToken(user);

    res.json({
      accessToken,
    });
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async getUserById(@Param('id') id: string) {
    console.log(id);
  }
}

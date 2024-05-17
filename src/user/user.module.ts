import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { KakaoService } from './services/kakao.service';
import { GoogleService } from './services/google.service';
import { NaverService } from './services/naver.service';
import { OAuthService } from './services/oauth.service';
import { OAuthFactory } from './oauth.factory';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    OAuthService,
    KakaoService,
    GoogleService,
    NaverService,
    OAuthFactory,
  ],
})
export class UserModule {}

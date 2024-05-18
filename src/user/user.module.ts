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
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 60 * 6000,
      },
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    OAuthService,
    KakaoService,
    GoogleService,
    NaverService,
    OAuthFactory,
    JwtStrategy,
  ],
  exports: [JwtStrategy, PassportModule],
})
export class UserModule {}

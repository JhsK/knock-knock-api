import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { GoogleStrategy } from './strategy/google.strategy';
import { KakaoStrategy } from './strategy/kakao.strategy';
import { NaverStrategy } from './strategy/naver.strategy';
import { JwtRefreshTokenStrategy } from './strategy/jwt/refresh.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User]),
    PassportModule.register({
      defaultStrategy: ['jwt'],
    }),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      signOptions: {
        expiresIn: 60 * 6000,
      },
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    JwtStrategy,
    JwtRefreshTokenStrategy,
    GoogleStrategy,
    KakaoStrategy,
    NaverStrategy,
  ],
  exports: [JwtStrategy, PassportModule],
})
export class UserModule {}

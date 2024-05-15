import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { KakaoService } from './kakao.service';

@Module({
  controllers: [AuthController],
  providers: [KakaoService],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { KakaoService } from './auth/kakao.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { JobApplicationModule } from './job-application/job-application.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeORMConfig),
    UsersModule,
    AuthModule,
    JobApplicationModule,
  ],
  controllers: [AppController],
  providers: [AppService, KakaoService],
})
export class AppModule {}

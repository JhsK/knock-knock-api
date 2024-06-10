import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookmarkModule } from './bookmark/bookmark.module';
import { typeORMConfig } from './configs/typeorm.config';
import { UserModule } from './user/user.module';
import { ApplicationModule } from './application/application.module';
import { ApplicationStatusModule } from './application-status/application-status.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeORMConfig),
    UserModule,
    BookmarkModule,
    ApplicationModule,
    ApplicationStatusModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

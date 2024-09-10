import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationModule } from 'src/application/application.module';
import { UserModule } from 'src/user/user.module';
import { BookmarkController } from './bookmark.controller';
import { Bookmark } from './bookmark.entity';
import { BookmarkService } from './bookmark.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bookmark]),
    UserModule,
    ApplicationModule,
  ],
  controllers: [BookmarkController],
  providers: [BookmarkService],
})
export class BookmarkModule {}

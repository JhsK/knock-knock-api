import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { GetUser } from 'src/user/decorator/get-user.decorator';
import { User } from 'src/user/user.entity';

@Controller('bookmark')
@UseGuards(AuthGuard())
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @Get()
  async getBookmarks() {
    const bookmarks = await this.bookmarkService.bookmarksList();
    return bookmarks;
  }

  @Post()
  @UsePipes(ValidationPipe)
  async postCreateBookmark(@Body() body: CreateBookmarkDto) {
    const bookmark = await this.bookmarkService.createBookmark(body);

    return bookmark;
  }

  @Post('/apply')
  async postApplyBookmarks(
    @Body('bookmarkIds') bookmarkIds: number[],
    @GetUser() user: User,
  ) {
    const bookmarks = await this.bookmarkService.applyBookmarks(
      bookmarkIds,
      user.id,
    );

    return bookmarks;
  }
}

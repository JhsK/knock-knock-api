import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { AuthGuard } from '@nestjs/passport';

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
}

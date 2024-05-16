import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookmark } from './bookmark.entity';
import { Repository } from 'typeorm';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectRepository(Bookmark)
    private readonly bookmarkRepository: Repository<Bookmark>,
  ) {}

  async bookmarksList() {
    const bookmarks = await this.bookmarkRepository.find();
    return bookmarks;
  }

  async createBookmark(createBookmarkDto: CreateBookmarkDto) {
    const bookmark = await this.bookmarkRepository.create(createBookmarkDto);
    await this.bookmarkRepository.save(bookmark);

    return bookmark;
  }
}

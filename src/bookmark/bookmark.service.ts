import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicationService } from 'src/application/application.service';
import { In, Repository } from 'typeorm';
import { Bookmark } from './bookmark.entity';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectRepository(Bookmark)
    private readonly bookmarkRepository: Repository<Bookmark>,
    private readonly applicationService: ApplicationService,
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

  async applyBookmarks(bookmarkIds: number[], userId: number) {
    const bookmarks = await this.bookmarkRepository.find({
      where: { id: In(bookmarkIds) },
    });
    const applicationsFromBookmarks = bookmarks.map((bookmark) => ({
      title: bookmark.title,
      companyName: bookmark.companyName,
      deadline: bookmark.deadline,
      userId,
    }));

    this.applicationService.bulkCreateFromBookmarks(applicationsFromBookmarks);

    return bookmarks;
  }
}

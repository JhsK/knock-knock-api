import { Bookmark } from 'src/bookmark/bookmark.entity';
import { JobApplication } from 'src/job-application/job-application.entity';
import {
  BaseEntity,
  Check,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserProvider } from './types/user';

@Entity()
@Check(`"provider" IN ('kakao', 'naver', 'google')`)
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickname: string;

  @Column({ name: 'provider_id', type: 'varchar', length: 255 })
  providerId: string;

  @Column({ name: 'provider' })
  provider: UserProvider;

  @Column({ name: 'register_at', type: 'datetime' })
  registerAt: Date;

  @OneToMany(() => JobApplication, (jobApplication) => jobApplication.user)
  jobApplications: JobApplication[];

  @OneToMany(() => Bookmark, (bookmark) => bookmark.user)
  bookmarks: Bookmark[];
}

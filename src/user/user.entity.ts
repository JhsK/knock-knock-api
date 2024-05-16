import { Bookmark } from 'src/bookmark/bookmark.entity';
import { JobApplication } from 'src/job-application/job-application.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SocialEnum } from './types/user';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickname: string;

  @Column({ name: 'social_id', type: 'varchar', length: 255 })
  socialId: string;

  @Column({ name: 'social_type', type: 'enum', enum: SocialEnum })
  socialType: SocialEnum;

  @Column({ name: 'register_at', type: 'datetime' })
  registerAt: Date;

  @OneToMany(() => JobApplication, (jobApplication) => jobApplication.user)
  jobApplications: JobApplication[];

  @OneToMany(() => Bookmark, (bookmark) => bookmark.user)
  bookmarks: Bookmark[];
}
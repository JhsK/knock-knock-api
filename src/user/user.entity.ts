import { Bookmark } from 'src/bookmark/bookmark.entity';
import { JobApplication } from 'src/job-application/job-application.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(() => JobApplication, (jobApplication) => jobApplication.user)
  jobApplications: JobApplication[];

  @OneToMany(() => Bookmark, (bookmark) => bookmark.user)
  bookmarks: Bookmark[];
}

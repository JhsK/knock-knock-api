import { Bookmark } from 'src/bookmark/bookmark.entity';
import {
  BaseEntity,
  Check,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserProvider } from './types/user';
import { Application } from 'src/application/application.entity';
import { ApplicationStatus } from 'src/application-status/application-status.entity';

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

  @OneToMany(() => Application, (application) => application.user)
  applications: Application[];

  @OneToMany(() => Bookmark, (bookmark) => bookmark.user)
  bookmarks: Bookmark[];

  @OneToMany(
    () => ApplicationStatus,
    (applicationSatuses) => applicationSatuses.user,
  )
  applicationStatuses: ApplicationStatus[];
}

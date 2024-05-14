import { User } from 'src/users/user.entity';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Bookmark extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'job_title' })
  jobTitle: string;

  @Column({ name: 'company_name' })
  companyName: string;

  @Column({ type: 'date' })
  deadline: string;

  @ManyToOne(() => User, (user) => user.bookmarks)
  user: User;
}

import { User } from 'src/user/user.entity';
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

  @Column()
  url: string;

  @Column()
  position: string;

  @Column()
  location: string;

  @Column({ name: 'work_experience' })
  workExperience: string;

  @ManyToOne(() => User, (user) => user.bookmarks)
  user: User;
}

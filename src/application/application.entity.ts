import { ApplicationStatus } from 'src/application-status/application-status.entity';
import { User } from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Application extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'company_name' })
  companyName: string;

  @Column({ default: 'SUBMITTED' })
  status: string;

  @Column({ type: 'date' })
  deadline: string;

  @ManyToOne(() => User, (user) => user.applications)
  user: User;

  @ManyToOne(
    () => ApplicationStatus,
    (applicationStatus) => applicationStatus.applications,
  )
  applicationStatus: ApplicationStatus;
}

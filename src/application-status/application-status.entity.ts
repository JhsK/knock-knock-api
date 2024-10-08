import { Application } from 'src/application/application.entity';
import { User } from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ApplicationStatus extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'title' })
  title: string;

  @Column()
  status: string;

  @Column()
  order: number;

  @ManyToOne(() => User, (user) => user.applicationStatuses)
  user: User;

  @OneToMany(
    () => Application,
    (applications) => applications.applicationStatus,
  )
  applications: Application[];
}

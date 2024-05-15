import { User } from 'src/user/user.entity';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class JobApplication extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'job_title' })
  jobTitle: string;

  @Column({ name: 'company_name' })
  companyName: string;

  @Column()
  status: string;

  @Column({ type: 'date' })
  deadline: string;

  @ManyToOne(() => User, (user) => user.jobApplications)
  user: User;
}

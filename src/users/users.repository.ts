import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { CustomRepository } from 'src/auth/decorator/typeorm-ex.decorator';

@CustomRepository(UsersRepository)
export class UsersRepository extends Repository<Users> {}

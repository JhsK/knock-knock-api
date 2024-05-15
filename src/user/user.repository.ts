import { Repository } from 'typeorm';
import { CustomRepository } from 'src/auth/decorator/typeorm-ex.decorator';
import { User } from './user.entity';

@CustomRepository(UserRepository)
export class UserRepository extends Repository<User> {}

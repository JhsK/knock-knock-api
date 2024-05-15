import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/typeorm-ex.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([UserRepository])],
  controllers: [UserController],
  providers: [UserService],
})
export class UsersModule {}

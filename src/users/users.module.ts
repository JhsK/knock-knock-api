import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/typeorm-ex.module';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([UsersRepository])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

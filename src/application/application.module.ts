import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './application.entity';
import { ApplicationService } from './application.service';

@Module({
  imports: [TypeOrmModule.forFeature([Application])],
  controllers: [],
  providers: [ApplicationService],
  exports: [ApplicationService],
})
export class ApplicationModule {}

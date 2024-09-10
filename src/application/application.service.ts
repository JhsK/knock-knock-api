import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from './application.entity';
import { CreateApplicationDto } from './dto/create-application.dto';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
  ) {}

  async bulkCreateFromBookmarks(
    bulkCreateApplicationsDto: CreateApplicationDto[],
  ) {
    const applications = bulkCreateApplicationsDto.map((applicationDto) =>
      this.applicationRepository.create({
        ...applicationDto,
      }),
    );

    const createdApplications =
      await this.applicationRepository.save(applications);

    return createdApplications;
  }
}

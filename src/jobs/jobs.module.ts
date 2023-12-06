import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { JobsRepository } from './repositories/jobs.repository';
import { DataService } from './repositories/data-service.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [JobsController],
  providers: [JobsService, JobsRepository, DataService],
})
export class JobsModule {}

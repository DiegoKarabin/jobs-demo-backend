import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JobsRepository } from './repositories/jobs.repository';
import { Job } from './entities/job.entity';
import { QueryDto } from './dto/query.dto';
import { PaginationPage } from 'src/utils/pagination/pagination-page';

@Injectable()
export class JobsService {
  constructor(private jobsRepository: JobsRepository) {}

  create(createJobDto: CreateJobDto) {
    const now = Date.now();
    const newJob = new Job();

    newJob.id = now;
    newJob.created_at = new Date(now);
    newJob.title = createJobDto.title;
    newJob.description = createJobDto.description;
    newJob.level = createJobDto.level;
    newJob.salary = createJobDto.salary;

    this.jobsRepository.save(newJob);

    return newJob;
  }

  findAll(queryDto: QueryDto): PaginationPage<Job> {
    return this.jobsRepository.findAll(queryDto);
  }

  findOne(id: number): Job {
    return this.jobsRepository.findOne(id);
  }

  update(id: number, updateJobDto: UpdateJobDto): Job {
    const updatedJob = new Job();

    updatedJob.id = id;
    updatedJob.title = updateJobDto.title;
    updatedJob.description = updateJobDto.description;
    updatedJob.level = updateJobDto.level;
    updatedJob.salary = updateJobDto.salary;

    return this.jobsRepository.update(id, updatedJob);
  }

  remove(id: number) {
    this.jobsRepository.remove(id);
  }
}

import { Injectable } from '@nestjs/common';
import { DataService } from './data-service.service';
import { Job } from '../entities/job.entity';
import { lastValueFrom } from 'rxjs';
import { NotFoundException } from '@nestjs/common';
import { QueryDto } from '../dto/query.dto';
import { PaginationPage } from '../../utils/pagination/pagination-page';
import querystringify from '../../utils/querystringify';
import { PaginationLinks } from '../../utils/pagination/pagination-links';
import { SortField } from 'src/enums/SortField';
import { SortDirection } from 'src/enums/SortDirection';

@Injectable()
export class JobsRepository {
  private jobs: Job[] = [];
  private static readonly PATH = '/jobs';

  constructor(private dataService: DataService) {
    this.populateData();
  }

  async populateData() {
    const data = await lastValueFrom(this.dataService.fetchData());

    this.jobs = data.map((jobData: any) => {
      const jobEntity = new Job();

      jobEntity.id = jobData.id;
      jobEntity.title = jobData.title;
      jobEntity.description = jobData.description;
      jobEntity.salary = jobData.salary;
      jobEntity.level = jobData.level;
      jobEntity.created_at = jobData.created_at;

      return jobEntity;
    });
  }

  save(job: Job): boolean {
    this.jobs.push(job);

    return true;
  }

  findAll(queryDto: QueryDto): PaginationPage<Job> {
    const paginationPage = new PaginationPage<Job>();

    const filteredJobs = this.filterAndSortJobs(queryDto);

    const page = queryDto.page;
    const size = queryDto.size;

    const startIndex = (page - 1) * size;
    const endIndex = Math.min(startIndex + size, filteredJobs.length);
    const pageItems = filteredJobs.slice(startIndex, endIndex);

    const totalPages = Math.ceil(filteredJobs.length / size);

    paginationPage.items = pageItems;
    paginationPage.meta = {
      itemsCount: pageItems.length,
      totalItems: filteredJobs.length,
      itemsPerPage: size,
      totalPages,
      currentPage: page,
    };
    paginationPage.links = this.buildPaginationLinks(
      queryDto,
      page,
      totalPages,
    );

    return paginationPage;
  }

  findOne(id: number): Job {
    const job = this.jobs.find((job: Job) => job.id == id);

    if (!job) {
      throw new NotFoundException();
    }

    return job;
  }

  update(id: number, updatedJob: Job): Job {
    const toReplaceIndex = this.findIndex(id);

    if (toReplaceIndex == -1) {
      throw new NotFoundException();
    }

    const outdatedJob = this.jobs[toReplaceIndex];

    updatedJob.created_at = outdatedJob.created_at;

    this.jobs.splice(toReplaceIndex, 1, updatedJob);

    return updatedJob;
  }

  remove(id: number) {
    const toDeleteIndex = this.findIndex(id);

    if (toDeleteIndex == -1) {
      throw new NotFoundException();
    }

    this.jobs.splice(toDeleteIndex, 1);
  }

  private findIndex(id: number) {
    return this.jobs.findIndex((job: Job) => job.id === id);
  }

  private filterAndSortJobs(queryDto: QueryDto): Job[] {
    let jobs: Job[] = this.jobs;

    if (queryDto.search) {
      jobs = jobs.filter((job: Job) => {
        const pattern = new RegExp(queryDto.search, 'i');

        return job.title.match(pattern) || job.description.match(pattern);
      });
    }

    if (queryDto.min_salary) {
      jobs = jobs.filter((job: Job) => job.salary >= queryDto.min_salary);
    }

    if (queryDto.max_salary) {
      jobs = jobs.filter((job: Job) => job.salary <= queryDto.max_salary);
    }

    if (queryDto.level) {
      jobs = jobs.filter((job: Job) => job.level == queryDto.level);
    }

    if (queryDto.sort_field) {
      jobs.sort((jobA: Job, jobB: Job) => {
        if (queryDto.sort_field == SortField.created_at) {
          if (queryDto.sort_direction == SortDirection.asc) {
            return jobA.created_at < jobB.created_at ? -1 : 1;
          } else {
            return jobA.created_at > jobB.created_at ? -1 : 1;
          }
        }

        if (queryDto.sort_field == SortField.salary) {
          if (queryDto.sort_direction == SortDirection.asc) {
            return jobA.salary - jobB.salary;
          } else {
            return jobB.salary - jobA.salary;
          }
        }
      });
    } else {
      jobs.sort((jobA: Job, jobB: Job) => jobA.id - jobB.id);
    }

    return jobs;
  }

  private buildPaginationLinks(
    queryDto: QueryDto,
    page: number,
    totalPages: number,
  ): PaginationLinks {
    const baseQueryString = { ...queryDto };

    const first = this.buildPathWithQueryString(baseQueryString, 1);
    const previous =
      page == 1 ? '' : this.buildPathWithQueryString(baseQueryString, page - 1);
    const next =
      page == totalPages
        ? ''
        : this.buildPathWithQueryString(baseQueryString, page + 1);
    const last = this.buildPathWithQueryString(baseQueryString, totalPages);

    return {
      first,
      previous,
      next,
      last,
    };
  }

  private buildPathWithQueryString(baseQueryString: any, page: number): string {
    return (
      `${JobsRepository.PATH}?` + querystringify({ ...baseQueryString, page })
    );
  }
}

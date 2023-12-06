import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
  Query,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { QueryDto } from './dto/query.dto';
import { PaginationPage } from '../utils/pagination/pagination-page';
import { Job } from './entities/job.entity';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @ApiCreatedResponse()
  @Post()
  create(@Body() createJobDto: CreateJobDto): Job {
    return this.jobsService.create(createJobDto);
  }

  @ApiOkResponse()
  @Get()
  findAll(@Query() queryDto: QueryDto): PaginationPage<Job> {
    return this.jobsService.findAll(queryDto);
  }

  @ApiOkResponse()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(+id);
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @Put(':id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(+id, updateJobDto);
  }

  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobsService.remove(+id);
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { Level } from 'src/enums/Level';

describe('JobsController', () => {
  let controller: JobsController;

  const mockJobsService = {
    create: jest.fn((dto: any) => ({
      id: Date.now(),
      ...dto,
      created_at: new Date(),
    })),
    update: jest.fn((id: number, dto: any) => ({
      id,
      ...dto,
      created_at: new Date(),
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobsController],
      providers: [JobsService],
    })
      .overrideProvider(JobsService)
      .useValue(mockJobsService)
      .compile();

    controller = module.get<JobsController>(JobsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a job', () => {
    const dto = {
      title: 'foo',
      description: 'bar',
      level: Level.junior,
      salary: 1234,
    };

    expect(controller.create(dto)).toEqual({
      id: expect.any(Number),
      ...dto,
      created_at: expect.any(Date),
    });
  });

  it('should update a job', () => {
    const dto = {
      title: 'foo',
      description: 'bar',
      level: Level.junior,
      salary: 1234,
    };

    expect(controller.update('1', dto)).toEqual({
      id: 1,
      ...dto,
      created_at: expect.any(Date),
    });
  });
});

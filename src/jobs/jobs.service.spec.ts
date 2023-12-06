import { Test, TestingModule } from '@nestjs/testing';
import { JobsService } from './jobs.service';
import { JobsRepository } from './repositories/jobs.repository';

describe('JobsService', () => {
  let service: JobsService;

  const mockPage = {
    items: [
      {
        id: 10,
        title: 'Frontend Developer',
        description:
          'Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
        salary: 9666,
        level: 'Expert',
        created_at: '2023-07-11T07:30:40Z',
      },
    ],
    meta: {
      itemsCount: 1,
      totalItems: 4,
      itemsPerPage: 3,
      totalPages: 2,
      currentPage: 2,
    },
    links: {
      first:
        '/jobs?page=1&size=3&search=frontend&min_salary=5000&sort_field=salary&sort_direction=asc',
      previous:
        '/jobs?page=1&size=3&search=frontend&min_salary=5000&sort_field=salary&sort_direction=asc',
      next: '',
      last: '/jobs?page=2&size=3&search=frontend&min_salary=5000&sort_field=salary&sort_direction=asc',
    },
  };
  const mockData = [
    {
      id: 1,
      title: 'Job 1',
      description: 'Some description',
      salary: 1234,
      level: 'Junior',
    },
    {
      id: 2,
      name: 'Job 2',
      description: 'Another description',
      salary: 4321,
      level: 'Mid-Level',
    },
  ];
  const mockRepository = {
    save: jest.fn(),
    findAll: jest.fn(() => mockPage),
    findOne: jest.fn((id: number) => {
      return mockData.find((mock_job: any) => mock_job.id === id);
    }),
    update: jest.fn().mockImplementation((id: number, dto: any) => ({
      id,
      ...dto,
      created_at: new Date(),
    })),
    remove: jest.fn().mockImplementation(() => true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobsService,
        {
          provide: JobsRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<JobsService>(JobsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const dto = {
      title: 'foo',
      description: 'bar',
      level: 'Junior',
      salary: 1234,
    };

    const expected_result = {
      id: expect.any(Number),
      ...dto,
      created_at: expect.any(Date),
    };

    it('returns a created job', () => {
      expect(service.create(dto)).toEqual(expected_result);
    });
  });

  describe('findAll', () => {
    it('returns all jobs paginated', () => {
      expect(service.findAll({ page: 1 })).toEqual(mockPage);
    });
  });

  describe('findOne', () => {
    it('returns the desired job', () => {
      expect(service.findOne(1)).toEqual(mockData[0]);
    });
  });

  describe('update', () => {
    const dto = {
      title: 'foo',
      description: 'bar',
      level: 'Junior',
      salary: 1234,
    };

    const expected_result = {
      id: expect.any(Number),
      ...dto,
      created_at: expect.any(Date),
    };

    it('returns the updated job', () => {
      expect(service.update(2, dto)).toEqual(expected_result);
    });
  });

  describe('remove', () => {
    it('returns nothing', () => {
      expect(service.remove(1)).toBeUndefined();
    });
  });
});

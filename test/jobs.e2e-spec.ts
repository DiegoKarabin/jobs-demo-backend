import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('JobsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/jobs (GET)', () => {
    return request(app.getHttpServer()).get('/jobs').expect(200);
  });

  const dto = {
    title: 'foo',
    description: 'bar',
    level: 'Junior',
    salary: 1234,
  };

  describe('/jobs (POST)', () => {
    it('responds with 201', () => {
      request(app.getHttpServer()).post('/jobs').send(dto).expect(201);
    });
  });

  describe('/jobs/:id (PUT)', () => {
    it('responds with 200', () => {
      request(app.getHttpServer()).put('/jobs/1').send(dto).expect(200);
    });
  });

  describe('/jobs/:id (DELETE)', () => {
    it('responds with 204', () => {
      request(app.getHttpServer()).delete('/jobs/1').expect(204);
    });
  });
});

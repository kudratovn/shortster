import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/modules/app.module';
import { RESULT_STATUSES } from './../src/constants/common';

describe('Url controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles create request', () => {
    return request(app.getHttpServer())
      .post('/submit')
      .send({
        url: "https://www.google.com",
        autoGenerate: true,
        short_code: null
      })
      .expect(201)
      .then(res => {
        const { status, data } = res.body;
        const { id, url, short_code } = data;
        expect(status).toBe(RESULT_STATUSES.SUCCESS);
        expect(id).toBeDefined();
        expect(url).toBe('https://www.google.com');
        expect(short_code).toBeDefined();
      })
  });
});

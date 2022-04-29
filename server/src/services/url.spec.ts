import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Urls from './../entity/Urls';

import { UrlService } from './UrlService';

describe('UrlService', () => {
  let service: UrlService;
  let repository: Repository<Urls>;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UrlService, 
        {
          provide: getRepositoryToken(Urls),
          useValue: {
            create: jest.fn(dto => dto),
            save: jest.fn(),
            findOne: jest.fn(),
          }
        }
      ]
    }).compile();
    service = module.get<UrlService>(UrlService);
    repository = module.get<Repository<Urls>>(getRepositoryToken(Urls));
  });
  it('should define the instance of url service', () => {
    expect(service).toBeDefined();
  });
  it('should define the instance of url repository', () => {
    expect(service).toBeDefined();
  });
  it('should generate short code length of 6', () => {
    const generated = service.generateCode();
    expect(generated.length).toBe(6);
  })
  it('should call utl create method', async () => {
    const newUrl = await service.createUrl({
      url: "https://www.google.com",
      autoGenerate: false,
      short_code: "test_call"
    });
    expect(newUrl?.short_code).toEqual("test_call")
  });
});
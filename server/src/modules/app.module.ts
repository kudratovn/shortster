import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UrlController } from '../controllers/UrlController';
import { ConfigService } from '../services/ConfigService';
import { UrlService } from '../services/UrlService';
import Urls from 'src/entity/Urls';

import { PRODUCTION } from '../constants/env';

const configService = new ConfigService();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: configService.config.DB_HOST,
      port: configService.config.DB_PORT,
      username: configService.config.DB_USERNAME,
      password: configService.config.DB_PASSWORD,
      database: configService.config.DB_DATABASE,
      entities: [
        Urls
      ],
      ssl: configService.config.NODE_ENV === PRODUCTION,
      extra:
        configService.config.NODE_ENV === PRODUCTION
          ? {
            ssl: {
              rejectUnauthorized: false,
            },
          }
          : undefined,
    }),
    TypeOrmModule.forFeature([
      Urls
    ]),
  ],
  controllers: [
    UrlController,
  ],
  providers: [
    ConfigService,
    UrlService
  ],
})
export class AppModule {}

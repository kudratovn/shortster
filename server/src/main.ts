import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ConfigService } from './services/ConfigService';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  app.enableCors({
    origin(origin, cb) {
      if(!origin || [configService.config.AUTHORITY].includes(origin)) {
        cb(null, true);
      } else {
        cb(new Error('Not allowed by CORS!'));
      }
    },
    allowedHeaders:
      'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe, Authorization',
    methods: 'GET,PUT,PATCH,POST,DELETE,UPDATE,OPTIONS',
    credentials: true,
  });
  await app.listen(configService.config.PORT);
}
bootstrap();

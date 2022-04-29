import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ConfigService } from './services/ConfigService';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get<ConfigService>(ConfigService);
  await app.listen(configService.config.PORT);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
const cors = require('cors')
import { AppModule } from './modules/app.module';
import { ConfigService } from './services/ConfigService';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  app.use(cors());
  await app.listen(configService.config.PORT);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3001;
  const logger = new Logger();

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  app.use(cookieParser());

  await app.listen(port);
  logger.log(`Application running on port ${port}`);
}
bootstrap();

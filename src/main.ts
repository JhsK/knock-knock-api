import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;

  console.log(`PORT ${port} - 서버 실행중입니다.`);
  await app.listen(port);
}
bootstrap();

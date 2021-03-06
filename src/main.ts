import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * App lister
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT);
}
bootstrap();

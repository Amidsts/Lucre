import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { rmq } from './rmqManager/connection';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: false });
  rmq.then(() => console.log('connected to rabbitmq successfully'));

  await app.listen(process.env.PORT ?? 3000);
}
console.log(`✅ App is running on port ${process.env.PORT ?? 3000}`);
bootstrap();

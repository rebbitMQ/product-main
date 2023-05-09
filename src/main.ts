import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ErrorFilter } from './filter/error.filter';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

const port = process.env.APP_PORT || 8081;
const logger = new Logger('Application Root');

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://blpztydp:f5QWLTLWxXjS7skQairSaeLN4tFkGTLU@kangaroo.rmq.cloudamqp.com/blpztydp'],
      queue: 'main_queue',
      queueOptions: {
        durable: false
      },
    },
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  app.useGlobalFilters(new ErrorFilter())
  await app.listen();
}
bootstrap();

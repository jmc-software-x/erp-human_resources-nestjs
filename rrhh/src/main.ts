import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173', 
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  });


  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,           // whitelist como minecraft , elimina props  no declarados (Por parte del Frontend React)
    forbidNonWhitelisted: true, // hola soy Kelby del pasado  error si mandan campos extra, 
    transform: true,          // convierte datos automaticamente  de string a number o eso entendi
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

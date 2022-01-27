import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiErrorFilter } from './error/error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpAdapter = app.get(HttpAdapterHost);

  app.useGlobalFilters(new ApiErrorFilter(httpAdapter));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,  // DTO에 정의 되지 않은 Property를 body에 넣어 넘길 시 'property 'xxx' should not exists' 에러를 띄움
      transform: true // 보통 param으로 들어온 값들은 string이라 컨트롤러에서 타입을 지정해주면 알아서 형변환 해줌
    })
  );

  await app.listen(3000);
}
bootstrap();

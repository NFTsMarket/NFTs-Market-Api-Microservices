import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { graphqlUploadExpress } from 'graphql-upload';
import { AppModule } from './app.module';
import { EnvKey } from './config/env-key.enum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(graphqlUploadExpress({ maxFileSize: 1000000000, maxFiles: 10 }));

  const configService: ConfigService = app.get(ConfigService);

  await app.listen(configService.get(EnvKey.PORT));
}
bootstrap();

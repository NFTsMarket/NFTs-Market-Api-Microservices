import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { AppModule } from './app.module';
import { EnvKey } from './config/env-key.enum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);

  app.enableCors();

  app.use(
    '/wallet',
    createProxyMiddleware({
      target: configService.get(EnvKey.WALLET_SERVICE),
      changeOrigin: true,
      pathRewrite: {
        '^/wallet': '',
      },
    }),
  );

  app.use(
    '/upload',
    createProxyMiddleware({
      target: configService.get(EnvKey.UPLOAD_SERVICE),
      changeOrigin: true,
    }),
  );

  app.use(
    '/catalogue',
    createProxyMiddleware({
      target: configService.get(EnvKey.CATALOGUE_SERVICE),
      xfwd: true,
      pathRewrite: {
        '^/catalogue': '',
      },
      secure: false,
      // forward: '',
    }),
  );

  app.use(
    '/buy',
    createProxyMiddleware({
      target: configService.get(EnvKey.BUY_SERVICE),
      changeOrigin: true,
    }),
  );

  app.use(
    '/picture',
    createProxyMiddleware({
      target: configService.get(EnvKey.CLOUD_FUNCTION),
      changeOrigin: true,
      pathRewrite: {
        '^/picture': '',
      },
    }),
  );

  await app.listen(configService.get(EnvKey.PORT));
}
bootstrap();

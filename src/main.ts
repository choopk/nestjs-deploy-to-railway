import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SeedService } from './seed/seed.service';
import { ConfigService } from '@nestjs/config';
import { config } from 'process';

declare const module: any;

if (process.env.NODE_ENV === 'production') {
  console.log('dildo');
  async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());
    // const seedService = app.get(SeedService);
    // await seedService.seed();
    const configService = app.get(ConfigService);

    await app.listen(configService.get<number>('port'));
    console.log('env!', configService.get('NODE_ENV'));
    // if (module.hot) {
    //   module.hot.accept();
    //   module.hot.dispose(() => app.close());
    // }
    // "start:dev": "nest build --webpack --webpackPath webpack-hmr.config.js --watch",
  }
  bootstrap();
}

export const viteNodeApp = (async () => {
  console.log('baggins');
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  console.log('env!', configService.get('NODE_ENV'));
  return app;
})();

import { TypeOrmModule } from '@nestjs/typeorm';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { SongsController } from './songs/songs.controller';
import { DevConfigService } from './common/providers/DevConfigService';

import { DataSource } from 'typeorm';

import { AuthModule } from './auth/auth.module';
import { PlayListModule } from './playlists/playlists.module';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { typeOrmAsyncConfig } from '../db/data-source';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { validate } from '../env.validation.ts';

const devConfig = { port: 3000 };
const proConfig = { port: 400 };

@Module({
  imports: [
    ConfigModule.forRoot({
      // envFilePath: ['.env.development', '.env.production'],
      envFilePath: [`${process.cwd()}/.env.${process.env.NODE_ENV}`],
      isGlobal: true,
      load: [configuration],
      validate: validate,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    SongsModule,
    PlayListModule,
    UsersModule,
    AuthModule,
    ArtistsModule,
    SeedModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: DevConfigService,
      useClass: DevConfigService,
    },
    {
      provide: 'CONFIG',
      useFactory: () => {
        return process.env.NODE_ENV === 'development' ? devConfig : proConfig;
      },
    },
  ],
  // })
  // export class AppModule implements NestModule {
  //   constructor(private dataSource: DataSource) {
  //     console.log('dbName', dataSource.driver.database);
  //   }
  //   configure(consumer: MiddlewareConsumer) {
  //     // consumer.apply(LoggerMiddleware).forRoutes('songs');
  //     // consumer
  //     //   .apply(LoggerMiddleware)
  //     //   .forRoutes({ path: 'songs', method: RequestMethod.POST });
  //     consumer.apply(LoggerMiddleware).forRoutes(SongsController);
  //   }
  // }
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {
    console.log('dbName', dataSource.driver.database);
  }
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('songs');
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes({ path: 'songs', method: RequestMethod.POST });
    consumer.apply(LoggerMiddleware).forRoutes(SongsController);
  }
}

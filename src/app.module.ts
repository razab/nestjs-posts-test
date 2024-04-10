import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import ormConfig from './config/orm.config';
import ormConfigProd from './config/orm.config.prod';
import { PostEntity } from './posts/entities/post.entity';
import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/services/posts.service';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: '127.0.0.1',
      port: 6379,
      ttl: 5 * 60 * 1000, // we have @nestjs/cache-manager@5 , it's milliseconds
      // max: 10, // maximum number of items in cache
      isGlobal: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig],
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: process.env.NODE_ENV !== 'production' ? ormConfig : ormConfigProd,
    }),
    TypeOrmModule.forFeature([PostEntity]),
  ],
  controllers: [AppController, PostsController],
  providers: [AppService, PostsService],
})
export class AppModule {}

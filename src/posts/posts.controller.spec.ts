import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostsController } from './posts.controller';
import ormConfigTest from '../config/orm.config.test';
import { PostEntity } from './entities/post.entity';
import { PostsService } from './services/posts.service';
import { CacheModule } from '@nestjs/cache-manager';

describe('PostsController', () => {
  let controller: PostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [PostsService],
      imports: [
        CacheModule.register({
          ttl: 5 * 60 * 1000, // we have @nestjs/cache-manager@5 , it's milliseconds
          // max: 10, // maximum number of items in cache
          isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
          useFactory: ormConfigTest,
        }),
        TypeOrmModule.forFeature([PostEntity]),
      ],
    }).compile();

    controller = module.get<PostsController>(PostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

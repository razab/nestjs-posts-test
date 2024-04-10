import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PostsService } from './posts.service';
import { PostEntity } from '../entities/post.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator
import { UUID } from '../../common/types';

const POST_TILE = 'post title';
const POST_BODY = 'post body, 1234567890';
const POST_UUID = uuidv4() as UUID;

/**
 * Notes: using mocked repositories - is a fast way to test something.
 * but I'd rather used real test database with seeding
 * it's slower, but guaranties correct db behaviour,
 * and we are not testing the tests
 * */

describe('PostsService', () => {
  let service: PostsService;
  let repository: Repository<PostEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(PostEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    repository = module.get<Repository<PostEntity>>(getRepositoryToken(PostEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a post', async () => {
      const postData: Partial<PostEntity> = { title: POST_TILE, body: POST_BODY };
      const createdPost: PostEntity = {
        id: POST_UUID,
        title: '',
        body: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        ...postData,
      };

      jest.spyOn(repository, 'save').mockResolvedValue(createdPost);

      expect(await service.create(postData)).toEqual(createdPost);
    });

    // Add more test cases for edge cases and validation scenarios
  });

  describe('findAll', () => {
    it('should return an array of posts', async () => {
      const offset = 0;
      const limit = 10;
      const posts: PostEntity[] = [
        {
          id: POST_UUID,
          title: POST_TILE,
          body: POST_BODY,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      jest.spyOn(repository, 'find').mockResolvedValue(posts);

      expect(await service.findAll(offset, limit)).toEqual(posts);
    });

    // Add more test cases for edge cases and validation scenarios
  });

  describe('findOneById', () => {
    it('should return a post by ID', async () => {
      const post: PostEntity = {
        id: POST_UUID,
        title: POST_TILE,
        body: POST_BODY,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(repository, 'findOneBy').mockResolvedValue(post);

      expect(await service.findOneById(POST_UUID)).toEqual(post);
    });

    // Add more test cases for edge cases and validation scenarios

    // add expected fails and so on
  });
});

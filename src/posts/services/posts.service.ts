import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PostEntity } from '../entities/post.entity';
import { UUID } from '../../common/types';

// base service ?
@Injectable()
export class PostsService {
  constructor(
    // private readonly configService: ConfigService,
    @InjectRepository(PostEntity) private readonly repository: Repository<PostEntity>,
  ) {}

  async create(postData: Partial<PostEntity>): Promise<PostEntity> {
    return await this.repository.save(postData);

    // test with sql injections
    // return await this.repository.createQueryBuilder().insert().into(PostEntity).values(postData).execute();
  }

  async findAll(offset: number = 0, limit: number = 10): Promise<PostEntity[]> {
    return await this.repository.find({
      take: limit,
      skip: offset,
      order: {
        createdAt: 'ASC',
      },
    });
  }

  async findOneById(id: UUID): Promise<PostEntity> {
    // TODO: test id undefined | null
    // create base repository if that's broken
    // see await this.createQueryBuilder('table').where({ id: id }).getOne();

    // variants with params
    // return await this.repository.createQueryBuilder('posts').where('posts.id = :id').setParameter('id', id).getOne();
    // return await this.repository.createQueryBuilder('posts').where('posts.id = :id', { id }).getOne();

    return await this.repository.findOneBy({ id });
  }
}

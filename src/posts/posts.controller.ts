import { Body, ConsoleLogger, Controller, Get, NotFoundException, Param, ParseUUIDPipe, Post, Query } from '@nestjs/common';
import { CreatePostDto } from './dtos';
import { PaginationParamsDto } from '../common/pagination-params.dto';
import { PostsService } from './services/posts.service';
import { ReadPostResponseDto } from './dtos/read-post-response.dto';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { PostEntity } from './entities/post.entity';
import { PartialType } from '@nestjs/mapped-types';

// @ApiBearerAuth()
// @UseGuards(JwtGuard)
@Controller('posts')
export class PostsController {
  logger: ConsoleLogger;

  // Dependency Injection
  constructor(private readonly service: PostsService) {
    this.logger = new ConsoleLogger();
    this.logger.setContext('PostsController');
  }

  // GET /api/v1/posts
  @Get()
  async findAll(@Query() query: PaginationParamsDto) {
    await this.service.findAll(query.offset, query.limit);
    const posts = await this.service.findAll();

    return plainToInstance(ReadPostResponseDto, instanceToPlain(posts), { excludeExtraneousValues: true }); // will hide updatedAt as it is not exposed
  }

  // GET /api/v1/posts/:id
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<ReadPostResponseDto> {
    this.logger.log(id);
    const post = await this.service.findOneById(id);

    if (!post) {
      throw new NotFoundException();
    }

    return plainToInstance(ReadPostResponseDto, instanceToPlain(post), { excludeExtraneousValues: true });
  }

  // POST /api/v1/posts
  @Post()
  async create(@Body() dtoInput: CreatePostDto) {
    // classToClassFromExist<PostEntity>(); -- replaced by plainToInstance(instanceToPlain(...))
    const input = plainToInstance(PartialType<PostEntity>(PostEntity), dtoInput);

    const post = await this.service.create({
      ...input,
    });

    // return post;
    return plainToInstance(ReadPostResponseDto, instanceToPlain(post), { excludeExtraneousValues: true });
  }

  // // PATCH /api/v1/posts/:id
  // @Patch(':id')
  // async update(@Param('id') id, @Body() input: UpdatePostDto) {
  //   const post = await this.repository.findOneBy({ id });
  //
  //   if (!post) {
  //     throw new NotFoundException();
  //   }
  //
  //   const data = await this.repository.save({
  //     ...post,
  //     ...input,
  //   });
  //
  //   return { success: true, data };
  // }
  //
  // // DELETE /api/v1/posts/:id
  // @Delete(':id')
  // @HttpCode(204)
  // async remove(@Param('id') id) {
  //   const post = await this.repository.findOneBy({ id });
  //
  //   if (!post) {
  //     throw new NotFoundException();
  //   }
  //
  //   await this.repository.remove(post);
  // }
}

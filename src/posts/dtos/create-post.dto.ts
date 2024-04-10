import { PickType } from '@nestjs/mapped-types';
import { PostBaseDto } from './post.base.dto';

export class CreatePostDto extends PickType(PostBaseDto, ['title', 'body'] as const) {}

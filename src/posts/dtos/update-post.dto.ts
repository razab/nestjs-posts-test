import { PartialType, PickType } from '@nestjs/mapped-types';
import { PostBaseDto } from './post.base.dto';

export class UpdatePostDto extends PartialType(PickType(PostBaseDto, ['title', 'body'] as const)) {}

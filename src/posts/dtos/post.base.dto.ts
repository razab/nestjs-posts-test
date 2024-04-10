import { Exclude, Expose } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';
import { UUID } from '../../common/types';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class PostBaseDto {
  @Expose()
  @ApiProperty({ example: '59b35631-a398-40f4-8bcb-6b79fd7caaee' })
  // @Length(36)
  @IsUUID()
  // @IsString()
  // @IsNotEmpty()
  id: UUID;

  @Expose()
  @ApiProperty({ example: 'test title' })
  @Length(5, 100)
  @IsString()
  @IsNotEmpty()
  title: string;

  @Expose()
  @ApiProperty({ example: 'test body with length more than 10...' })
  @Length(10, 500)
  @IsString()
  @IsNotEmpty()
  body: string;

  @Expose()
  @ApiProperty({ example: 'test body with length more than 10...' })
  @IsDateString()
  createdAt: string;

  // @Expose()
  @ApiProperty({ example: 'test body with length more than 10...' })
  @IsDateString()
  updatedAt: string;
}

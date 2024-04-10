import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginationParamsDto {
  @ApiPropertyOptional({
    description: 'Optional, defaults to 100',
    type: Number,
    example: 100,
  })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  limit = 100;

  @ApiPropertyOptional({
    description: 'Optional, defaults to 0',
    type: Number,
    example: 0,
  })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  offset = 0;
}

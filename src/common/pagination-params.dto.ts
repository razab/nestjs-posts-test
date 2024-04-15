import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNumber, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationParamsDto {
  @ApiPropertyOptional({
    description: 'Optional, defaults to 10',
    type: Number,
    example: 10,
  })
  @Max(100)
  @Min(1)
  @IsNumber()
  @IsInt()
  @Type(() => Number)
  limit = 10;

  @ApiPropertyOptional({
    description: 'Optional, defaults to 0',
    type: Number,
    example: 0,
  })
  @Min(0)
  @IsInt()
  @Type(() => Number)
  offset = 0;
}

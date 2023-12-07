import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsAlphanumeric,
  IsEnum,
  IsInt,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import { Level } from 'src/enums/Level';
import { SortDirection } from 'src/enums/SortDirection';
import { SortField } from 'src/enums/SortField';

export class QueryDto {
  @ApiProperty({
    description: 'page number for pagination',
    required: false,
    type: [Number],
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number = 1;

  @ApiProperty({
    description: 'page size for pagination',
    required: false,
    type: [Number],
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(30)
  @Type(() => Number)
  size?: number = 10;

  @ApiProperty({
    description: 'string to search for in job title and description',
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsAlphanumeric()
  search?: string;

  @ApiProperty({
    description: 'minimum salary filter param',
    required: false,
    type: [Number],
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  min_salary?: number;

  @ApiProperty({
    description: 'maximum salary filter param',
    required: false,
    type: [Number],
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  max_salary?: number;

  @ApiProperty({
    description: 'level required for this job',
    required: false,
    type: [Level],
  })
  @IsOptional()
  @IsEnum(Level)
  level?: Level;

  @ApiProperty({
    description: 'field for sorting jobs',
    required: false,
    type: [SortField],
  })
  @IsOptional()
  @IsEnum(SortField)
  sort_field?: SortField;

  @ApiProperty({
    description: 'sorting direction',
    required: false,
    type: [SortDirection],
  })
  @IsOptional()
  @IsEnum(SortDirection)
  sort_direction?: SortDirection;
}

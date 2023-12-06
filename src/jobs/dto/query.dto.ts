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

export enum SortField {
  salary = 'salary',
  created_at = 'created_at',
}

export enum SortDirection {
  asc = 'asc',
  desc = 'desc',
}

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

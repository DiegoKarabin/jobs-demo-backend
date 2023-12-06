import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  MaxLength,
} from 'class-validator';

enum Level {
  entry_level = 'Entry Level',
  junior = 'Junior',
  mid_level = 'Mid Level',
  senior = 'Senior',
}

export class CreateJobDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(30)
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(100)
  description: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  salary: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Level)
  level: Level;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  MaxLength,
} from 'class-validator';
import { Level } from 'src/enums/Level';

export class UpdateJobDto {
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

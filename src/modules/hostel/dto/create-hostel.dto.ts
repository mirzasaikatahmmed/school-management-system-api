import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateHostelDto {
  @ApiProperty() @IsString() @IsNotEmpty() name: string;
  @ApiProperty() @IsNumber() @IsNotEmpty() categoryId: number;
  @ApiProperty() @IsString() @IsNotEmpty() address: string;
  @ApiPropertyOptional() @IsString() @IsOptional() watchman?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() remarks?: string;
  @ApiPropertyOptional() @IsNumber() @IsOptional() branchId?: number;
}

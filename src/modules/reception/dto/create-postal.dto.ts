import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsDateString,
  IsEnum,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PostalType } from '../entities/postal-record.entity';

export class CreatePostalDto {
  @ApiProperty({ enum: PostalType })
  @IsEnum(PostalType)
  @IsNotEmpty()
  type: PostalType;
  @ApiProperty() @IsString() @IsNotEmpty() from: string;
  @ApiProperty() @IsString() @IsNotEmpty() to: string;
  @ApiPropertyOptional() @IsString() @IsOptional() referenceNo?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() subject?: string;
  @ApiProperty({ example: '2025-06-01' }) @IsDateString() @IsNotEmpty() postalDate: string;
  @ApiPropertyOptional() @IsString() @IsOptional() note?: string;
  @ApiPropertyOptional() @IsNumber() @IsOptional() branchId?: number;
}

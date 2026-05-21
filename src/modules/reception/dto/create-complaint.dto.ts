import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateComplaintDto {
  @ApiProperty() @IsString() @IsNotEmpty() complainant: string;
  @ApiPropertyOptional() @IsString() @IsOptional() phone?: string;
  @ApiProperty() @IsString() @IsNotEmpty() subject: string;
  @ApiPropertyOptional() @IsString() @IsOptional() description?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() action?: string;
  @ApiProperty({ example: '2025-06-01' }) @IsDateString() @IsNotEmpty() complaintDate: string;
  @ApiPropertyOptional({ default: 'open' }) @IsString() @IsOptional() status?: string;
  @ApiPropertyOptional() @IsNumber() @IsOptional() branchId?: number;
}

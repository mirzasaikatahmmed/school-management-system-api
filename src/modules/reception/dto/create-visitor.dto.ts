import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateVisitorDto {
  @ApiProperty() @IsString() @IsNotEmpty() name: string;
  @ApiPropertyOptional() @IsString() @IsOptional() phone?: string;
  @ApiProperty() @IsString() @IsNotEmpty() toMeet: string;
  @ApiPropertyOptional() @IsString() @IsOptional() purpose?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() inTime?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() outTime?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() idCardNo?: string;
  @ApiProperty({ example: '2025-06-01' }) @IsDateString() @IsNotEmpty() visitDate: string;
  @ApiPropertyOptional() @IsNumber() @IsOptional() branchId?: number;
}

import {
  IsNumber,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ApplyLeaveDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() staffId: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() leaveCategoryId: number;
  @ApiProperty({ example: '2025-06-01' }) @IsDateString() @IsNotEmpty() fromDate: string;
  @ApiProperty({ example: '2025-06-03' }) @IsDateString() @IsNotEmpty() toDate: string;
  @ApiProperty() @IsNumber() @IsNotEmpty() @Min(1) totalDays: number;
  @ApiPropertyOptional() @IsString() @IsOptional() reason?: string;
  @ApiPropertyOptional() @IsNumber() @IsOptional() branchId?: number;
}

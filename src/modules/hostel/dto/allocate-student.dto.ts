import {
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AllocateStudentDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() studentId: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() hostelId: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() roomId: number;
  @ApiProperty({ example: '2025-06-01' }) @IsDateString() @IsNotEmpty() fromDate: string;
  @ApiPropertyOptional({ example: '2026-05-31' })
  @IsDateString()
  @IsOptional()
  toDate?: string;
  @ApiPropertyOptional() @IsNumber() @IsOptional() sessionId?: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() branchId?: number;
}

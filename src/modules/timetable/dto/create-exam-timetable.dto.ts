import {
  IsNumber,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateExamTimetableDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() examId: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() classId: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() subjectId: number;
  @ApiProperty({ example: '2025-11-01' }) @IsDateString() @IsNotEmpty() examDate: string;
  @ApiProperty({ example: '09:00' }) @IsString() @IsNotEmpty() startTime: string;
  @ApiProperty({ example: '12:00' }) @IsString() @IsNotEmpty() endTime: string;
  @ApiPropertyOptional() @IsString() @IsOptional() roomNo?: string;
  @ApiPropertyOptional() @IsNumber() @IsOptional() branchId?: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() sessionId?: number;
}

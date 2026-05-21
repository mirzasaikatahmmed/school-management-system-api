import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsDateString,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateExamSessionDto {
  @ApiProperty() @IsString() @IsNotEmpty() title: string;
  @ApiProperty() @IsNumber() @IsNotEmpty() classId: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() subjectId?: number;
  @ApiProperty({ example: '2025-07-01' }) @IsDateString() @IsNotEmpty() examDate: string;
  @ApiProperty({ example: '09:00' }) @IsString() @IsNotEmpty() startTime: string;
  @ApiProperty({ example: '10:00' }) @IsString() @IsNotEmpty() endTime: string;
  @ApiPropertyOptional({ default: 60 })
  @IsNumber()
  @IsOptional()
  @Min(1)
  durationMinutes?: number;
  @ApiPropertyOptional({ default: 100 })
  @IsNumber()
  @IsOptional()
  @Min(1)
  totalMarks?: number;
  @ApiPropertyOptional({ default: 33 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  passMarks?: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() branchId?: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() sessionId?: number;
}

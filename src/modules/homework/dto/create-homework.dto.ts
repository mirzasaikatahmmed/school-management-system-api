import {
  IsNumber,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateHomeworkDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() classId: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() sectionId?: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() subjectId: number;
  @ApiProperty() @IsString() @IsNotEmpty() title: string;
  @ApiPropertyOptional() @IsString() @IsOptional() description?: string;
  @ApiProperty({ example: '2025-06-10' })
  @IsDateString()
  @IsNotEmpty()
  submissionDate: string;
  @ApiPropertyOptional() @IsNumber() @IsOptional() @Min(0) maxMarks?: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() branchId?: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() sessionId?: number;
}

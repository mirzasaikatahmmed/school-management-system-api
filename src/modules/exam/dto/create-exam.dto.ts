import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateExamTermDto {
  @ApiProperty({ example: 'Half Yearly' })
  @IsString()
  name: string;

  @ApiProperty({ example: 6 })
  @IsNumber()
  sessionId: number;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  @IsOptional()
  branchId?: number;
}

export class CreateExamDto {
  @ApiProperty({ example: 'Half Yearly Exam 2025' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 3, description: 'Exam term ID' })
  @IsNumber()
  @IsOptional()
  termId?: number;

  @ApiProperty({ example: 1, description: '1=Mark, 2=GPA, 3=Both' })
  @IsNumber()
  typeId: number;

  @ApiProperty({ example: 6 })
  @IsNumber()
  sessionId: number;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  @IsOptional()
  branchId?: number;

  @ApiPropertyOptional({ example: '' })
  @IsString()
  @IsOptional()
  remark?: string;

  @ApiPropertyOptional({ example: '{"1":"Written","2":"MCQ"}' })
  @IsString()
  @IsOptional()
  markDistribution?: string;
}

export class CreateGradeDto {
  @ApiProperty({ example: 'A+' })
  @IsString()
  name: string;

  @ApiProperty({ example: '5.00' })
  @IsString()
  gradePoint: string;

  @ApiProperty({ example: 80 })
  @IsNumber()
  lowerMark: number;

  @ApiProperty({ example: 100 })
  @IsNumber()
  upperMark: number;

  @ApiPropertyOptional({ example: 'Excellent!' })
  @IsString()
  @IsOptional()
  remark?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  @IsOptional()
  branchId?: number;
}

export class SubmitMarkDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  studentId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  subjectId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  classId: number;

  @ApiProperty({ example: 4 })
  @IsNumber()
  sectionId: number;

  @ApiProperty({ example: 1, description: 'Exam ID' })
  @IsNumber()
  examId: number;

  @ApiPropertyOptional({
    example: '{"1":"68","2":"29"}',
    description: 'JSON with marks per component',
  })
  @IsString()
  @IsOptional()
  mark?: string;

  @ApiPropertyOptional({
    example: '',
    description: 'Non-empty if student was absent',
  })
  @IsString()
  @IsOptional()
  absent?: string;

  @ApiProperty({ example: 6 })
  @IsNumber()
  sessionId: number;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  @IsOptional()
  branchId?: number;
}

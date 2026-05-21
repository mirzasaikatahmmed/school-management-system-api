import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateQuestionDto {
  @ApiPropertyOptional() @IsNumber() @IsOptional() groupId?: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() subjectId?: number;
  @ApiProperty() @IsString() @IsNotEmpty() question: string;
  @ApiProperty() @IsString() @IsNotEmpty() optionA: string;
  @ApiProperty() @IsString() @IsNotEmpty() optionB: string;
  @ApiPropertyOptional() @IsString() @IsOptional() optionC?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() optionD?: string;
  @ApiProperty({ description: 'Correct answer: a, b, c or d' })
  @IsString()
  @IsNotEmpty()
  correctAnswer: string;
  @ApiPropertyOptional() @IsString() @IsOptional() explanation?: string;
  @ApiPropertyOptional() @IsNumber() @IsOptional() branchId?: number;
}

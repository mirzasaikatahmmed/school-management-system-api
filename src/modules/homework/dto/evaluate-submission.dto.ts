import { IsNumber, IsString, IsOptional, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class EvaluateSubmissionDto {
  @ApiPropertyOptional() @IsNumber() @IsOptional() @Min(0) obtainedMarks?: number;
  @ApiPropertyOptional() @IsString() @IsOptional() feedback?: string;
}

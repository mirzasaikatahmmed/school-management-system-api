import { IsNumber, IsNotEmpty, IsOptional, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SubmitExamDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() examSessionId: number;
  @ApiProperty({
    description: 'Map of questionId to selected answer (a/b/c/d)',
    example: { '1': 'a', '2': 'c' },
  })
  @IsObject()
  @IsNotEmpty()
  answers: Record<string, string>;
  @ApiPropertyOptional() @IsNumber() @IsOptional() branchId?: number;
}

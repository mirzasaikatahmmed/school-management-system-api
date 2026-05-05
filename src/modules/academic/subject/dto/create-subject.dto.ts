import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSubjectDto {
  @ApiProperty({ example: 'BANGLA' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '101' })
  @IsString()
  @IsNotEmpty()
  subjectCode: string;

  @ApiProperty({ example: 'Mandatory', enum: ['Mandatory', 'Optional'] })
  @IsString()
  @IsNotEmpty()
  subjectType: string;

  @ApiPropertyOptional({ example: '' })
  @IsString()
  @IsOptional()
  subjectAuthor?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  @IsOptional()
  branchId?: number;
}

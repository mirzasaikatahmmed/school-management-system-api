import {
  IsNumber,
  IsNotEmpty,
  IsOptional,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GeneratePayrollDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() staffId: number;
  @ApiProperty({ description: '1-12', example: 6 })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(12)
  month: number;
  @ApiProperty({ example: 2025 }) @IsNumber() @IsNotEmpty() year: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() accountId?: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() branchId?: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() sessionId?: number;
}

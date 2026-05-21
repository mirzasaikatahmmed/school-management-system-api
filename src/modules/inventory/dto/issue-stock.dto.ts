import {
  IsNumber,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class IssueStockDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() productId: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() @Min(1) quantity: number;
  @ApiProperty({ example: '2025-06-01' }) @IsDateString() @IsNotEmpty() issueDate: string;
  @ApiPropertyOptional() @IsString() @IsOptional() issuedTo?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() note?: string;
  @ApiPropertyOptional() @IsNumber() @IsOptional() branchId?: number;
}

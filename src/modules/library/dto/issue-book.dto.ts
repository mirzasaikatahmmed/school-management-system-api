import {
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class IssueBookDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() bookId: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() userId: number;
  @ApiProperty({ description: 'Role ID of the borrower' })
  @IsNumber()
  @IsNotEmpty()
  roleId: number;
  @ApiPropertyOptional({ example: '2025-06-01' })
  @IsDateString()
  @IsOptional()
  dateOfIssue?: string;
  @ApiProperty({ example: '2025-06-15' }) @IsDateString() @IsNotEmpty() dateOfExpiry: string;
  @ApiProperty() @IsNumber() @IsNotEmpty() sessionId: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() branchId?: number;
}

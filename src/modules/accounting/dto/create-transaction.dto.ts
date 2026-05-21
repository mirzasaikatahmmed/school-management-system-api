import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsDateString,
  IsEnum,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TransactionType } from '../entities/transaction.entity';

export class CreateTransactionDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() accountId: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() voucherHeadId?: number;
  @ApiProperty({ enum: TransactionType })
  @IsEnum(TransactionType)
  @IsNotEmpty()
  transactionType: TransactionType;
  @ApiProperty() @IsNumber() @IsNotEmpty() @Min(0.01) amount: number;
  @ApiPropertyOptional() @IsString() @IsOptional() description?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() referenceNo?: string;
  @ApiProperty({ example: '2025-06-01' }) @IsDateString() @IsNotEmpty() transactionDate: string;
  @ApiPropertyOptional() @IsNumber() @IsOptional() branchId?: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() sessionId?: number;
}

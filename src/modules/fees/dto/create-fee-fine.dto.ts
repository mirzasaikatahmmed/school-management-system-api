import {
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDateString,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FineType } from '../entities/fee-fine.entity';

export class CreateFeeFineDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() groupId: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() typeId: number;
  @ApiProperty({ enum: FineType, default: FineType.FIXED })
  @IsEnum(FineType)
  @IsNotEmpty()
  fineType: FineType;
  @ApiProperty() @IsNumber() @IsNotEmpty() @Min(0) fineValue: number;
  @ApiPropertyOptional({ description: '0=Fixed, 1=Daily, 7=Weekly, 30=Monthly, 365=Annually', default: 0 })
  @IsNumber()
  @IsOptional()
  feeFrequency?: number;
  @ApiPropertyOptional({ example: '2025-06-30' }) @IsDateString() @IsOptional() dueDate?: string;
  @ApiPropertyOptional() @IsNumber() @IsOptional() sessionId?: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() branchId?: number;
}

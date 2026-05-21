import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsDateString,
  IsEnum,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CallType } from '../entities/call-log.entity';

export class CreateCallLogDto {
  @ApiProperty({ example: 'Ahmed Rahman' }) @IsString() @IsNotEmpty() name: string;
  @ApiPropertyOptional() @IsString() @IsOptional() number?: string;
  @ApiPropertyOptional() @IsNumber() @IsOptional() purposeId?: number;
  @ApiProperty({ enum: CallType }) @IsEnum(CallType) @IsNotEmpty() callType: CallType;
  @ApiProperty({ example: '2025-06-01' }) @IsDateString() @IsNotEmpty() date: string;
  @ApiPropertyOptional({ example: '09:00' }) @IsString() @IsOptional() startTime?: string;
  @ApiPropertyOptional({ example: '09:15' }) @IsString() @IsOptional() endTime?: string;
  @ApiPropertyOptional({ example: '2025-06-05' }) @IsDateString() @IsOptional() followUp?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() note?: string;
  @ApiPropertyOptional() @IsNumber() @IsOptional() branchId?: number;
}

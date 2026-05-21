import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty() @IsString() @IsNotEmpty() title: string;
  @ApiProperty() @IsNumber() @IsNotEmpty() eventTypeId: number;
  @ApiProperty({ example: '2025-07-01' }) @IsDateString() @IsNotEmpty() fromDate: string;
  @ApiProperty({ example: '2025-07-02' }) @IsDateString() @IsNotEmpty() toDate: string;
  @ApiPropertyOptional({ example: '09:00' }) @IsString() @IsOptional() fromTime?: string;
  @ApiPropertyOptional({ example: '17:00' }) @IsString() @IsOptional() toTime?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() note?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() photo?: string;
  @ApiPropertyOptional() @IsNumber() @IsOptional() branchId?: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() sessionId?: number;
}

import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsDateString,
  IsEmail,
  IsEnum,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EnquiryStatus } from '../entities/enquiry.entity';

export class CreateEnquiryDto {
  @ApiProperty({ example: 'Rahim Uddin' }) @IsString() @IsNotEmpty() name: string;
  @ApiPropertyOptional() @IsString() @IsOptional() fatherName?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() motherName?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() gender?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() mobileNo?: string;
  @ApiPropertyOptional() @IsEmail() @IsOptional() email?: string;
  @ApiProperty({ example: '2025-06-01' }) @IsDateString() @IsNotEmpty() date: string;
  @ApiPropertyOptional({ example: '2010-05-15' }) @IsDateString() @IsOptional() birthday?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() address?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() previousSchool?: string;
  @ApiPropertyOptional() @IsNumber() @IsOptional() noOfChild?: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() classId?: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() referenceId?: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() responseId?: number;
  @ApiPropertyOptional() @IsString() @IsOptional() response?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() note?: string;
  @ApiPropertyOptional({ enum: EnquiryStatus, default: EnquiryStatus.ACTIVE })
  @IsEnum(EnquiryStatus)
  @IsOptional()
  status?: EnquiryStatus;
  @ApiPropertyOptional() @IsNumber() @IsOptional() assignedId?: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() branchId?: number;
}

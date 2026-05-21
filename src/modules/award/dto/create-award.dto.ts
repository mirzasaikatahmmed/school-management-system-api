import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsDateString,
  IsEnum,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AwardRecipientType } from '../entities/award.entity';

export class CreateAwardDto {
  @ApiProperty() @IsString() @IsNotEmpty() title: string;
  @ApiProperty({ enum: AwardRecipientType })
  @IsEnum(AwardRecipientType)
  @IsNotEmpty()
  recipientType: AwardRecipientType;
  @ApiProperty() @IsNumber() @IsNotEmpty() recipientId: number;
  @ApiPropertyOptional() @IsString() @IsOptional() description?: string;
  @ApiProperty({ example: '2025-06-01' }) @IsDateString() @IsNotEmpty() awardDate: string;
  @ApiPropertyOptional() @IsNumber() @IsOptional() awardedBy?: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() branchId?: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() sessionId?: number;
}

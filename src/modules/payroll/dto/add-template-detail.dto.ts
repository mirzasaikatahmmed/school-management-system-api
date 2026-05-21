import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsEnum,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AllowanceType } from '../entities/salary-template-detail.entity';

export class AddTemplateDetailDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() templateId: number;
  @ApiProperty() @IsString() @IsNotEmpty() title: string;
  @ApiProperty({ enum: AllowanceType })
  @IsEnum(AllowanceType)
  @IsNotEmpty()
  type: AllowanceType;
  @ApiPropertyOptional({ default: 'fixed' })
  @IsString()
  @IsOptional()
  amountType?: string;
  @ApiProperty() @IsNumber() @IsNotEmpty() @Min(0) amount: number;
}

import { IsString, IsNotEmpty, IsOptional, IsNumber, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CertificateType } from '../entities/certificate-template.entity';

export class CreateCertificateTemplateDto {
  @ApiProperty() @IsString() @IsNotEmpty() title: string;
  @ApiProperty({ enum: CertificateType })
  @IsEnum(CertificateType)
  @IsNotEmpty()
  type: CertificateType;
  @ApiPropertyOptional() @IsString() @IsOptional() content?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() headerImage?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() backgroundImage?: string;
  @ApiPropertyOptional() @IsNumber() @IsOptional() branchId?: number;
}

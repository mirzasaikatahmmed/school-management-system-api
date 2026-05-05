import {
  IsString,
  IsOptional,
  IsEmail,
  IsNumber,
  IsBoolean,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiPropertyOptional({ example: '2021001' })
  @IsString()
  @IsOptional()
  registerNo?: string;

  @ApiPropertyOptional({ example: '2021-01-01' })
  @IsString()
  @IsOptional()
  admissionDate?: string;

  @ApiProperty({ example: 'Ayasha' })
  @IsString()
  firstName: string;

  @ApiPropertyOptional({ example: 'Siddika' })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiPropertyOptional({ example: 'female', enum: ['male', 'female', 'other'] })
  @IsString()
  @IsOptional()
  gender?: string;

  @ApiPropertyOptional({ example: '2010-05-15' })
  @IsString()
  @IsOptional()
  birthday?: string;

  @ApiPropertyOptional({ example: 'Islam' })
  @IsString()
  @IsOptional()
  religion?: string;

  @ApiPropertyOptional({ example: 'B+' })
  @IsString()
  @IsOptional()
  bloodGroup?: string;

  @ApiPropertyOptional({ example: 'Bangla' })
  @IsString()
  @IsOptional()
  motherTongue?: string;

  @ApiPropertyOptional({ example: 'Bera, Pabna' })
  @IsString()
  @IsOptional()
  currentAddress?: string;

  @ApiPropertyOptional({ example: 'Bera, Pabna' })
  @IsString()
  @IsOptional()
  permanentAddress?: string;

  @ApiPropertyOptional({ example: 'Pabna' })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiPropertyOptional({ example: 'Rajshahi' })
  @IsString()
  @IsOptional()
  state?: string;

  @ApiPropertyOptional({ example: '01711223344' })
  @IsString()
  @IsOptional()
  mobileno?: string;

  @ApiPropertyOptional({ example: 4 })
  @IsNumber()
  @IsOptional()
  categoryId?: number;

  @ApiPropertyOptional({ example: 'student@school.edu.bd' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ example: 1, description: 'Parent/guardian ID' })
  @IsNumber()
  @IsOptional()
  parentId?: number;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}

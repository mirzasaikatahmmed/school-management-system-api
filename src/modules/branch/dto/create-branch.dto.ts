import { IsString, IsEmail, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBranchDto {
  @ApiProperty({ example: 'Main Branch' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Ahsk Bera High School' })
  @IsString()
  schoolName: string;

  @ApiProperty({ example: 'info@school.edu.bd' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '01711223344' })
  @IsString()
  mobileno: string;

  @ApiProperty({ example: 'BDT' })
  @IsString()
  currency: string;

  @ApiProperty({ example: '৳' })
  @IsString()
  symbol: string;

  @ApiPropertyOptional({ example: 'Pabna' })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiPropertyOptional({ example: 'Rajshahi' })
  @IsString()
  @IsOptional()
  state?: string;

  @ApiPropertyOptional({ example: 'Bera, Pabna, Bangladesh' })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({ example: 'Asia/Dhaka' })
  @IsString()
  @IsOptional()
  timezone?: string;

  @ApiPropertyOptional({ example: 'STU' })
  @IsString()
  @IsOptional()
  stuUsernamePrefix?: string;

  @ApiPropertyOptional({ example: '123456' })
  @IsString()
  @IsOptional()
  stuDefaultPassword?: string;

  @ApiPropertyOptional({ example: 'GRD' })
  @IsString()
  @IsOptional()
  grdUsernamePrefix?: string;

  @ApiPropertyOptional({ example: '123456' })
  @IsString()
  @IsOptional()
  grdDefaultPassword?: string;

  @ApiPropertyOptional({ example: 30 })
  @IsNumber()
  @IsOptional()
  dueDays?: number;
}

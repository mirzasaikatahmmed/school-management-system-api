import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsEmail,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateParentDto {
  @ApiProperty() @IsString() @IsNotEmpty() fullName: string;
  @ApiPropertyOptional() @IsString() @IsOptional() relation?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() fatherName?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() motherName?: string;
  @ApiPropertyOptional() @IsEmail() @IsOptional() email?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() phone?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() occupation?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() income?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() education?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() city?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() state?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() address?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() nationalId?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() profilePhoto?: string;
  @ApiPropertyOptional() @IsNumber() @IsOptional() branchId?: number;
}

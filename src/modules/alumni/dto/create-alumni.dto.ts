import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsEmail,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAlumniDto {
  @ApiPropertyOptional() @IsNumber() @IsOptional() studentId?: number;
  @ApiProperty() @IsString() @IsNotEmpty() fullName: string;
  @ApiPropertyOptional() @IsEmail() @IsOptional() email?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() phone?: string;
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Min(1900)
  passingYear?: number;
  @ApiPropertyOptional() @IsString() @IsOptional() occupation?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() address?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() photo?: string;
  @ApiPropertyOptional() @IsNumber() @IsOptional() branchId?: number;
}

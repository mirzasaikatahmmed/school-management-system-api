import {
  IsNumber,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty() @IsString() @IsNotEmpty() title: string;
  @ApiProperty() @IsString() @IsNotEmpty() author: string;
  @ApiProperty() @IsString() @IsNotEmpty() isbnNo: string;
  @ApiProperty() @IsNumber() @IsNotEmpty() categoryId: number;
  @ApiProperty() @IsString() @IsNotEmpty() publisher: string;
  @ApiProperty() @IsString() @IsNotEmpty() edition: string;
  @ApiProperty({ example: '2024-01-15' }) @IsDateString() @IsNotEmpty() purchaseDate: string;
  @ApiPropertyOptional() @IsString() @IsOptional() description?: string;
  @ApiProperty() @IsNumber() @IsNotEmpty() @Min(0) price: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() @Min(1) totalStock: number;
  @ApiPropertyOptional() @IsString() @IsOptional() cover?: string;
  @ApiPropertyOptional() @IsNumber() @IsOptional() branchId?: number;
}

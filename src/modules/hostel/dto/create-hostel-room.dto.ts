import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateHostelRoomDto {
  @ApiProperty() @IsString() @IsNotEmpty() name: string;
  @ApiProperty() @IsNumber() @IsNotEmpty() hostelId: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() @Min(1) noBeds: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() categoryId?: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() @Min(0) bedFee: number;
  @ApiPropertyOptional() @IsString() @IsOptional() remarks?: string;
  @ApiPropertyOptional() @IsNumber() @IsOptional() branchId?: number;
}

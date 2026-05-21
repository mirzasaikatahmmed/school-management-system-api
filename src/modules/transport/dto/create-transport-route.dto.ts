import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTransportRouteDto {
  @ApiProperty() @IsString() @IsNotEmpty() name: string;
  @ApiProperty() @IsString() @IsNotEmpty() startPlace: string;
  @ApiPropertyOptional() @IsString() @IsOptional() stopPlace?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() remarks?: string;
  @ApiPropertyOptional() @IsNumber() @IsOptional() branchId?: number;
}

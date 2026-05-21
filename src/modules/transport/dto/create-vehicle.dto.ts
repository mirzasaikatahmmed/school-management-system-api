import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateVehicleDto {
  @ApiProperty() @IsString() @IsNotEmpty() vehicleNo: string;
  @ApiProperty() @IsString() @IsNotEmpty() capacity: string;
  @ApiProperty() @IsString() @IsNotEmpty() insuranceRenewal: string;
  @ApiProperty() @IsString() @IsNotEmpty() driverName: string;
  @ApiProperty() @IsString() @IsNotEmpty() driverPhone: string;
  @ApiProperty() @IsString() @IsNotEmpty() driverLicense: string;
  @ApiPropertyOptional() @IsNumber() @IsOptional() branchId?: number;
}

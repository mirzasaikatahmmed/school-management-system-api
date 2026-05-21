import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateStoppageDto {
  @ApiProperty() @IsString() @IsNotEmpty() name: string;
  @ApiProperty() @IsNumber() @IsNotEmpty() routeId: number;
  @ApiPropertyOptional() @IsString() @IsOptional() pickupTime?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() dropTime?: string;
  @ApiPropertyOptional({ default: 0 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  monthlyFee?: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() branchId?: number;
}

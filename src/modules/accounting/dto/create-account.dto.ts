import { IsString, IsNotEmpty, IsOptional, IsNumber, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAccountDto {
  @ApiProperty() @IsString() @IsNotEmpty() accountName: string;
  @ApiPropertyOptional() @IsString() @IsOptional() accountNo?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() accountType?: string;
  @ApiPropertyOptional({ default: 0 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  openingBalance?: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() branchId?: number;
}

import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateClassDto {
  @ApiProperty({ example: 'SIX', description: 'Class name (text label)' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '6',
    description: 'Numeric representation for sorting',
  })
  @IsString()
  @IsNotEmpty()
  nameNumeric: string;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  @IsOptional()
  branchId?: number;
}

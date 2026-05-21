import { IsString, IsNotEmpty, IsOptional, IsNumber, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateExamHallDto {
  @ApiProperty({ example: 'Hall A' }) @IsString() @IsNotEmpty() hallNo: string;
  @ApiProperty({ example: 50 }) @IsNumber() @IsNotEmpty() @Min(1) seats: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() branchId?: number;
}

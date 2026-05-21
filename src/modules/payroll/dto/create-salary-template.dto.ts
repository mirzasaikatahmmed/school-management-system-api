import { IsString, IsNotEmpty, IsOptional, IsNumber, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSalaryTemplateDto {
  @ApiProperty() @IsString() @IsNotEmpty() name: string;
  @ApiProperty() @IsNumber() @IsNotEmpty() @Min(0) basicSalary: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() branchId?: number;
}

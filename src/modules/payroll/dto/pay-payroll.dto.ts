import { IsNumber, IsOptional, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PayPayrollDto {
  @ApiPropertyOptional({ example: '2025-06-01' })
  @IsDateString()
  @IsOptional()
  paymentDate?: string;
  @ApiPropertyOptional() @IsNumber() @IsOptional() accountId?: number;
}

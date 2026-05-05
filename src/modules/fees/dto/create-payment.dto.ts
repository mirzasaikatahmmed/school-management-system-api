import { IsNumber, IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateFeeAllocationDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  studentId: number;

  @ApiProperty({ example: 8, description: 'Fee group ID' })
  @IsNumber()
  groupId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  branchId: number;

  @ApiProperty({ example: 6, description: 'School year / session ID' })
  @IsNumber()
  sessionId: number;

  @ApiPropertyOptional({ example: 0 })
  @IsNumber()
  @IsOptional()
  prevDue?: number;
}

export class CollectPaymentDto {
  @ApiProperty({ example: 5, description: 'Fee allocation ID' })
  @IsNumber()
  allocationId: number;

  @ApiProperty({ example: 8, description: 'Fee type ID' })
  @IsNumber()
  typeId: number;

  @ApiProperty({ example: 100 })
  @IsNumber()
  amount: number;

  @ApiPropertyOptional({ example: 0 })
  @IsNumber()
  @IsOptional()
  discount?: number;

  @ApiPropertyOptional({ example: 0 })
  @IsNumber()
  @IsOptional()
  fine?: number;

  @ApiProperty({ example: '1', description: '1=Cash 2=Cheque 3=Online' })
  @IsString()
  payVia: string;

  @ApiPropertyOptional({ example: '' })
  @IsString()
  @IsOptional()
  remarks?: string;

  @ApiProperty({ example: '2025-05-05' })
  @IsString()
  date: string;
}

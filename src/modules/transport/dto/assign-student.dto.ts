import { IsNumber, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AssignStudentDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() studentId: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() routeId: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() stoppageId?: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() vehicleId?: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() sessionId?: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() branchId?: number;
}

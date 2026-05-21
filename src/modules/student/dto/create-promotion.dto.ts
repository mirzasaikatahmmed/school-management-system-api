import { IsNumber, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePromotionDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() studentId: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() fromClassId: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() fromSectionId?: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() fromSessionId: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() toClassId: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() toSectionId?: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() toSessionId: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() branchId?: number;
}

import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SendMessageDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() receiverId: number;
  @ApiProperty() @IsString() @IsNotEmpty() message: string;
  @ApiPropertyOptional() @IsString() @IsOptional() subject?: string;
  @ApiPropertyOptional() @IsNumber() @IsOptional() branchId?: number;
}

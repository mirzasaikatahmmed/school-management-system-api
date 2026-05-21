import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class RejectLeaveDto {
  @ApiPropertyOptional() @IsString() @IsOptional() rejectionReason?: string;
}

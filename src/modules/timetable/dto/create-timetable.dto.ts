import {
  IsNumber,
  IsString,
  IsNotEmpty,
  IsOptional,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTimetableDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() classId: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() sectionId?: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() subjectId: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() teacherId?: number;
  @ApiProperty({ description: '1=Mon, 2=Tue ... 7=Sun', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(7)
  dayOfWeek: number;
  @ApiProperty({ example: '08:00' }) @IsString() @IsNotEmpty() startTime: string;
  @ApiProperty({ example: '08:45' }) @IsString() @IsNotEmpty() endTime: string;
  @ApiPropertyOptional() @IsString() @IsOptional() roomNo?: string;
  @ApiPropertyOptional() @IsNumber() @IsOptional() branchId?: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() sessionId?: number;
}

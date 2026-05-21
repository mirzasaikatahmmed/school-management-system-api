import { IsNumber, IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SubmitHomeworkDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() homeworkId: number;
  @ApiPropertyOptional() @IsString() @IsOptional() content?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() filePath?: string;
}

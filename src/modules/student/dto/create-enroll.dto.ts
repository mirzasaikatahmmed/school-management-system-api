import { IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEnrollDto {
  @ApiProperty({ example: 1, description: 'Student ID' })
  @IsNumber()
  @IsNotEmpty()
  studentId: number;

  @ApiProperty({ example: 1, description: 'Class ID' })
  @IsNumber()
  @IsNotEmpty()
  classId: number;

  @ApiProperty({ example: 4, description: 'Section ID' })
  @IsNumber()
  @IsNotEmpty()
  sectionId: number;

  @ApiProperty({ example: 1, description: 'Roll number in class' })
  @IsNumber()
  @IsNotEmpty()
  roll: number;

  @ApiProperty({ example: 6, description: 'School year / session ID' })
  @IsNumber()
  @IsNotEmpty()
  sessionId: number;

  @ApiProperty({ example: 1, description: 'Branch ID' })
  @IsNumber()
  @IsNotEmpty()
  branchId: number;
}

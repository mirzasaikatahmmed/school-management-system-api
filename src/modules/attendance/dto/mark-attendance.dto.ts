import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsNumber,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AttendanceStatus } from '../entities/student-attendance.entity';

export class AttendanceEntryDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  enrollId: number;

  @ApiProperty({
    example: 'P',
    enum: AttendanceStatus,
    description: 'P=Present A=Absent H=Holiday L=Late',
  })
  @IsEnum(AttendanceStatus)
  status: AttendanceStatus;

  @ApiPropertyOptional({ example: '' })
  @IsString()
  @IsOptional()
  remark?: string;
}

export class MarkStudentAttendanceDto {
  @ApiProperty({ example: '2025-05-05' })
  @IsString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  branchId: number;

  @ApiProperty({ type: [AttendanceEntryDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttendanceEntryDto)
  attendance: AttendanceEntryDto[];
}

export class MarkStaffAttendanceDto {
  @ApiProperty({ example: '2025-05-05' })
  @IsString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  branchId: number;

  @ApiProperty({
    example: [{ staffId: 1, status: 'P', remark: '' }],
    description: 'Array of {staffId, status, remark?}',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Object)
  attendance: { staffId: number; status: string; remark?: string }[];
}

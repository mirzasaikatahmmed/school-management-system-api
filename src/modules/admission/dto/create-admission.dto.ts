import {
  IsString,
  IsOptional,
  IsEmail,
  IsNumber,
  IsBoolean,
  IsNotEmpty,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class GuardianDto {
  @ApiPropertyOptional({
    description:
      'Set true if the guardian already has an account; then only provide guardianId',
  })
  @IsBoolean()
  @IsOptional()
  alreadyExists?: boolean;

  @ApiPropertyOptional({
    description:
      'Existing guardian/parent ID (required when alreadyExists=true)',
  })
  @IsNumber()
  @IsOptional()
  guardianId?: number;

  // Fields required only when alreadyExists=false
  @ApiPropertyOptional({ example: 'Karim Uddin' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    example: 'Father',
    description: 'Relationship to student',
  })
  @IsString()
  @IsOptional()
  relation?: string;

  @ApiPropertyOptional({ example: 'Abdul Karim' })
  @IsString()
  @IsOptional()
  fatherName?: string;

  @ApiPropertyOptional({ example: 'Fatema Begum' })
  @IsString()
  @IsOptional()
  motherName?: string;

  @ApiPropertyOptional({ example: 'Farmer' })
  @IsString()
  @IsOptional()
  occupation?: string;

  @ApiPropertyOptional({ example: '15000' })
  @IsString()
  @IsOptional()
  income?: string;

  @ApiPropertyOptional({ example: 'SSC' })
  @IsString()
  @IsOptional()
  education?: string;

  @ApiPropertyOptional({ example: 'Bera' })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiPropertyOptional({ example: 'Rajshahi' })
  @IsString()
  @IsOptional()
  state?: string;

  @ApiPropertyOptional({ example: '01711223344' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({ example: 'guardian@email.com' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ example: 'Village Bera, Pabna' })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({ example: 'guardian_photo.jpg' })
  @IsString()
  @IsOptional()
  photo?: string;

  @ApiPropertyOptional({
    example: 'guardian_user',
    description: 'Login username for guardian portal',
  })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiPropertyOptional({
    example: 'P@ssword123',
    description: 'Login password for guardian portal',
  })
  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string;
}

export class CreateAdmissionDto {
  // ── Academic Details ──────────────────────────────────────────────────────
  @ApiProperty({ example: 1, description: 'Branch ID' })
  @IsNumber()
  @Type(() => Number)
  branchId: number;

  @ApiProperty({ example: 6, description: 'Academic session / school year ID' })
  @IsNumber()
  @Type(() => Number)
  sessionId: number;

  @ApiProperty({ example: 1, description: 'Class ID' })
  @IsNumber()
  @Type(() => Number)
  classId: number;

  @ApiPropertyOptional({ example: 2, description: 'Section ID' })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  sectionId?: number;

  @ApiPropertyOptional({ example: 42, description: 'Roll number' })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  roll?: number;

  @ApiPropertyOptional({
    example: '2025001',
    description: 'Student register number',
  })
  @IsString()
  @IsOptional()
  registerNo?: string;

  @ApiPropertyOptional({
    example: '2025-01-10',
    description: 'Admission date (YYYY-MM-DD)',
  })
  @IsString()
  @IsOptional()
  admissionDate?: string;

  @ApiPropertyOptional({ example: 1, description: 'Student category ID' })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  categoryId?: number;

  // ── Student Details ───────────────────────────────────────────────────────
  @ApiProperty({ example: 'Ayasha' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiPropertyOptional({ example: 'Siddika' })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiPropertyOptional({ example: 'female', enum: ['male', 'female', 'other'] })
  @IsString()
  @IsOptional()
  gender?: string;

  @ApiPropertyOptional({ example: 'B+' })
  @IsString()
  @IsOptional()
  bloodGroup?: string;

  @ApiPropertyOptional({ example: '2010-05-15' })
  @IsString()
  @IsOptional()
  birthday?: string;

  @ApiPropertyOptional({ example: 'Bangla' })
  @IsString()
  @IsOptional()
  motherTongue?: string;

  @ApiPropertyOptional({ example: 'Islam' })
  @IsString()
  @IsOptional()
  religion?: string;

  @ApiPropertyOptional({ example: 'General' })
  @IsString()
  @IsOptional()
  caste?: string;

  @ApiPropertyOptional({ example: '01711223344' })
  @IsString()
  @IsOptional()
  mobileno?: string;

  @ApiPropertyOptional({ example: 'student@email.com' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ example: 'Bera, Pabna' })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiPropertyOptional({ example: 'Rajshahi' })
  @IsString()
  @IsOptional()
  state?: string;

  @ApiPropertyOptional({ example: 'Village Bera, Pabna' })
  @IsString()
  @IsOptional()
  currentAddress?: string;

  @ApiPropertyOptional({ example: 'Village Bera, Pabna' })
  @IsString()
  @IsOptional()
  permanentAddress?: string;

  @ApiPropertyOptional({ example: '9876543210' })
  @IsString()
  @IsOptional()
  fathersNid?: string;

  @ApiPropertyOptional({ example: '1234567890' })
  @IsString()
  @IsOptional()
  mothersNid?: string;

  @ApiPropertyOptional({ example: '20101234567890123' })
  @IsString()
  @IsOptional()
  birthRegNo?: string;

  @ApiPropertyOptional({ example: 'student_photo.jpg' })
  @IsString()
  @IsOptional()
  photo?: string;

  // ── Student Login ─────────────────────────────────────────────────────────
  @ApiProperty({
    example: 'ayasha2025',
    description: 'Student portal username',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'P@ssword123',
    description: 'Student portal password',
  })
  @IsString()
  @MinLength(6)
  password: string;

  // ── Guardian Details ──────────────────────────────────────────────────────
  @ApiProperty({ type: () => GuardianDto })
  @Type(() => GuardianDto)
  guardian: GuardianDto;

  // ── Transport (optional) ──────────────────────────────────────────────────
  @ApiPropertyOptional({ example: 1, description: 'Transport route ID' })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  routeId?: number;

  @ApiPropertyOptional({ example: 1, description: 'Vehicle ID' })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  vehicleId?: number;

  @ApiPropertyOptional({ example: 2, description: 'Stoppage ID' })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  stoppageId?: number;

  // ── Hostel (optional) ─────────────────────────────────────────────────────
  @ApiPropertyOptional({ example: 1, description: 'Hostel ID' })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  hostelId?: number;

  @ApiPropertyOptional({ example: 2, description: 'Room ID' })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  roomId?: number;

  // ── Previous School ───────────────────────────────────────────────────────
  @ApiPropertyOptional({ example: 'Bera Primary School' })
  @IsString()
  @IsOptional()
  previousSchool?: string;

  @ApiPropertyOptional({ example: 'JSC' })
  @IsString()
  @IsOptional()
  previousQualification?: string;

  @ApiPropertyOptional({ example: 'Good student' })
  @IsString()
  @IsOptional()
  remarks?: string;
}

import {
  IsString,
  IsEmail,
  IsOptional,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateStaffDto {
  @ApiPropertyOptional({ example: 'EMP-001' })
  @IsString()
  @IsOptional()
  staffId?: string;

  @ApiProperty({ example: 'Md. Kamal Pasha' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 1, description: 'Department ID' })
  @IsNumber()
  department: number;

  @ApiPropertyOptional({ example: 'M.Sc.' })
  @IsString()
  @IsOptional()
  qualification?: string;

  @ApiProperty({ example: 2, description: 'Designation ID' })
  @IsNumber()
  designation: number;

  @ApiProperty({
    example: '2020-01-15',
    description: 'Joining date YYYY-MM-DD',
  })
  @IsString()
  joiningDate: string;

  @ApiPropertyOptional({ example: '1985-06-20' })
  @IsString()
  @IsOptional()
  birthday?: string;

  @ApiPropertyOptional({ example: 'male', enum: ['male', 'female', 'other'] })
  @IsString()
  @IsOptional()
  sex?: string;

  @ApiPropertyOptional({ example: 'Islam' })
  @IsString()
  @IsOptional()
  religion?: string;

  @ApiPropertyOptional({ example: 'B+' })
  @IsString()
  @IsOptional()
  bloodGroup?: string;

  @ApiPropertyOptional({ example: 'Bera, Pabna' })
  @IsString()
  @IsOptional()
  presentAddress?: string;

  @ApiPropertyOptional({ example: 'Bera, Pabna' })
  @IsString()
  @IsOptional()
  permanentAddress?: string;

  @ApiProperty({ example: '01711223344' })
  @IsString()
  mobileno: string;

  @ApiProperty({ example: 'teacher@school.edu.bd' })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ example: 0 })
  @IsNumber()
  @IsOptional()
  salaryTemplateId?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  @IsOptional()
  branchId?: number;
}

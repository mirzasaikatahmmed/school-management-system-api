import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSchoolYearDto {
  @ApiProperty({ example: '2025', description: 'Academic year e.g. 2025' })
  @IsString()
  @IsNotEmpty()
  schoolYear: string;
}

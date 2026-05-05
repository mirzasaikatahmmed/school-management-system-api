import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({ example: 'oldPass123' })
  @IsString()
  @IsNotEmpty()
  currentPassword: string;

  @ApiProperty({ example: 'newPass456', description: 'Min 6 characters' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  newPassword: string;
}

import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'mirzasaikatahmmed@gmail.com',
    description: 'Username or email',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'secret123',
    description: 'Account password (min 6 chars)',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

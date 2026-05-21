import { IsNumber, IsNotEmpty, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddStockDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() productId: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() @Min(1) quantity: number;
}

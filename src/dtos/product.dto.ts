import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class ProductDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  readonly amount: number;

  @IsNotEmpty()
  readonly description: string;
}

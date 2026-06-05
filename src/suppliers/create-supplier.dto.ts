import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateSupplierDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @IsString()
  @MinLength(2)
  @MaxLength(255)
  address: string;

  @IsString()
  @MinLength(7)
  @MaxLength(15)
  phone: string;
}

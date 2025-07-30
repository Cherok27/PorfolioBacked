import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nombre del usuario (unique)',
    nullable: false,
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  username: string;

  @ApiProperty({
    description: 'Email del usuario (unique)',
    nullable: false,
    minLength: 6,
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    nullable: false,
    minLength: 6,
    maxLength: 50,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  pasword: string;
}

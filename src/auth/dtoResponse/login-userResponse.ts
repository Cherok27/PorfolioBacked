import { ApiProperty } from '@nestjs/swagger';
import { LoginUserDto } from '../dto/login-user.dto';

export class LoginUserResponseDto extends LoginUserDto {
  @ApiProperty({
    example: '366edd88-2509-42c5-92b1-66f6dc799d60',
    description: 'User ID',
  })
  id: string;
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'Token generado',
  })
  token: string;
}

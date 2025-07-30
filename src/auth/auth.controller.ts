import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/users.entity';
import { Auth, GetUser, RoleProtected } from './decorators';
import { AuthGuard } from '@nestjs/passport';
import { ValidRole } from './interfaces';
import { ApiResponse } from '@nestjs/swagger';
import { LoginUserResponseDto } from './dtoResponse/login-userResponse';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({
    status: 201,
    description: 'User was created',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden Token related.',
  })
  createUser(@Body() createAuthDto: CreateUserDto) {
    return this.authService.create(createAuthDto);
  }
  @Post('login')
  @ApiResponse({
    status: 201,
    description: 'Logueado correctamente',
    type: LoginUserResponseDto,
  })
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
  @Get('check-status')
  @Auth() // Esto lo usamos para que los de frontend tenga conque verificar cada vez que los usarios refrescan y asi no tener que hacer login
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }
  @Get('private')
  @RoleProtected(ValidRole.admin, ValidRole.superUser)
  @UseGuards(AuthGuard()) // Este guarda utiliza la estrategia que ya tenemos definida
  getPrivateRoute(@GetUser('email') userEmail: string) {
    return {
      ok: true,
      message: 'holamundo',
      userEmail,
    };
  }
  @Get('users')
  @ApiResponse({
    status: 200,
    description: 'Get users',
    type: [User],
  })
  @Auth(ValidRole.admin, ValidRole.superUser)
  getAllUsers() {
    return this.authService.getAllUsers();
  }
}

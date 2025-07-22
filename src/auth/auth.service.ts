import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayLoad } from './interfaces';

interface DBError {
  code: string;
  detail?: string;
}
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const { pasword, ...userData } = createUserDto;
      const user = this.userRepository.create({
        ...userData,
        pasword: bcrypt.hashSync(pasword, 10),
      });
      await this.userRepository.save(user);
      return { ...user, token: this.getJwtToken({ id: user.id }) };
    } catch (error) {
      this.handleErrors(error);
    }
    return 'This action adds a new auth';
  }
  async login(loginUserDto: LoginUserDto) {
    console.log(loginUserDto);
    const { email, pasword } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, pasword: true, id: true },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials (email');
    }
    if (!bcrypt.compareSync(pasword, user.pasword)) {
      throw new UnauthorizedException('Invalid credentials (password)');
    }
    await this.userRepository.update(user.id, {
      lastLogin: new Date(),
    }); // Aqui actualizamos el campo lastLogin
    return {
      ...user,
      token: this.getJwtToken({
        id: user.id,
      }),
    };
  }
  checkAuthStatus(user: User) {
    return { ...user, token: this.getJwtToken({ id: user.id }) };
  }
  async getAllUsers() {
    let users: User[];
    try {
      users = await this.userRepository.find();
      return users;
    } catch (error) {
      this.handleErrors(error);
    }
  }
  private getJwtToken(payload: JwtPayLoad) {
    const token = this.jwtService.sign(payload);
    return token;
  }
  private handleErrors(error: any): never {
    if (this.isDBError(error) && error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    console.log(error);
    throw new InternalServerErrorException('Please check server logs');
  }
  private isDBError(error: any): error is DBError {
    return typeof error === 'object' && error !== null && 'code' in error;
  }
}

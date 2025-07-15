import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayLoad } from '../interfaces/jwt-payload.interface';
import { User } from '../entities/users.entity';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    configService: ConfigService,
  ) {
    const jwtSecret = configService.get<string>('JWT_SECRET');
    if (!jwtSecret) throw new BadRequestException('El token no esta definido');
    super({
      secretOrKey: jwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: JwtPayLoad): Promise<User> {
    const { id } = payload;
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new UnauthorizedException('Token not valid');
    if (!user.isActive)
      throw new UnauthorizedException('User is inactive, talk to an admin');
    return user;
  }
}

import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from '../entities/users.entity';

export interface AuthRequest extends Request {
  user: User;
}
// el createParamDecorator espera una funcion callback
export const GetUser = createParamDecorator(
  (data: keyof AuthRequest['user'], ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<AuthRequest>();
    const user = req.user;
    if (!user)
      throw new InternalServerErrorException('User not found(request)');
    return data ? user[data] : user;
  },
);

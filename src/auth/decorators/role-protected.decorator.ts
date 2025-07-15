import { SetMetadata } from '@nestjs/common';
import { ValidRole } from 'src/auth/interfaces';

export const META_ROLES = 'roles';
export const RoleProtected = (...arg: ValidRole[]) =>
  SetMetadata(META_ROLES, arg);

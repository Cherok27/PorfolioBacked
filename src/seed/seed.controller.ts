import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import { Auth } from 'src/auth/decorators';
import { ValidRole } from 'src/auth/interfaces';
import { ApiResponse } from '@nestjs/swagger';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  @ApiResponse({
    status: 201,
    description: 'Semilla generada con exito',
  })
  @Auth(ValidRole.admin)
  findAll() {
    return this.seedService.rundSeed();
  }
}

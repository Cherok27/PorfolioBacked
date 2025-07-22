import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private readonly userRespository: Repository<User>,
  ) {}
  async rundSeed() {
    await this.deleteTables();
    await this.insertUsers();
    return 'SEED EXECUTED';
  }
  private async deleteTables() {
    const queryBuilder = this.userRespository.createQueryBuilder();
    await queryBuilder.delete().where({}).execute();
  }
  private async insertUsers() {
    const seedUsers = initialData.users;
    const users: User[] = [];
    seedUsers.forEach((user) => {
      users.push(this.userRespository.create(user));
    });
    const dbUsers = await this.userRespository.save(seedUsers);
    return dbUsers[0];
  }
}

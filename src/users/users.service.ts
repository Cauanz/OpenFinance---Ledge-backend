import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { genSaltSync, hashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: {
        id,
      },
    });
  }

  async create(email: string, username: string, password: string) {
    const salt = genSaltSync(10);
    const hashPass = hashSync(password, salt);

    const user = this.usersRepository.create({
      email,
      username,
      password: hashPass,
      transactions: [],
      recurrences: [],
    });

    await this.usersRepository.save(user);
  }
}

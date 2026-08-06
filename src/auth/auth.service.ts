import { HttpCode, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signUp(
    username: string,
    email: string,
    password: string,
  ): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (user) {
      return 'algum erro';
    }

    await this.userService.create(email, username, password);
  }

  // TODO - CRIAR FUNÇÃO DE VALIDAÇÃO DE USER E LOGIN
}

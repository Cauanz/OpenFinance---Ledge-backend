import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signUp(username, email, password: string): Promise<any> {
    // TODO - TERMINAR ESSA FUNÇÃO
    const user = await this.usersService.findByEmail(email);
  }

  // TODO - CRIAR FUNÇÃO DE VALIDAÇÃO DE USER E LOGIN
}

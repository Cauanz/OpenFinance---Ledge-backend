import { HttpCode, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { User } from '../users/entities/user.entity';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      return null;
    }

    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass) {
      return null;
    }

    return user;
  }

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

  async logIn(email: string, password: string): Promise<any> {
    const user = await this.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    //TODO - TROCAR RETORNO POR JWT
    return {
      message: 'Login successful',
      userId: user.id,
    };
  }
}

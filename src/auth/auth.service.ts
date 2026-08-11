import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

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
      throw new UnauthorizedException();
    }

    await this.userService.create(email, username, password);
  }

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.SECRET,
      }),
    };
  }
}

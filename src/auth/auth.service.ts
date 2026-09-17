import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AppService } from 'src/app.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private appService: AppService,
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
  ): Promise<void | Error> {
    const user = await this.userService.findByEmail(email);

    if (user) {
      throw new ConflictException('User already exists.');
    }

    const createdUser = await this.userService.create(
      email,
      username,
      password,
    );

    if (!createdUser) {
      throw new NotFoundException('There was an error creating the user!');
    }

    return;
  }

  async signIn(email: string, password: string): Promise<object | Error> {
    const user = await this.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = { id: user.id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.SECRET,
      }),
    };
  }
}

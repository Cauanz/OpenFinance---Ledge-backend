import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signUp(username, email, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
  }
}

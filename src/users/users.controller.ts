import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UsersService } from './users.service';

type RequestType = {
  IncomingMessage: Promise<object>;
  user: {
    id: string;
    username: string;
    iat: number;
    exp: number;
  };
};

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/u')
  getProfile(@Request() req: RequestType) {
    const user = this.userService.findById(req.user.id);
    return user;
  }

  @Patch('/:u_id')
  updateUser(
    @Body() bodyData: Record<string, any>,
    @Param('u_id') u_id: string,
  ) {
    if (!u_id) {
      throw new NotFoundException('User ID not found!');
    }

    return this.userService.updateUser(bodyData, u_id);
  }

  @Delete('/d/:u_id')
  deleteUser(@Param('u_id') u_id: string) {
    return this.userService.deleteUser(u_id);
  }
}

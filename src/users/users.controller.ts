import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';

type RequestType = {
  IncomingMessage: Promise<object>;
  user: {
    id?: string;
    username?: string;
    iat?: number;
    exp?: number;
  };
};

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/me')
  getProfile(@Request() req: RequestType) {
    const user = this.userService.findById(req.user.id);
    return user;
  }

  @Patch('/:u_id')
  updateUser(
    @Body() bodyData: Record<string, any>,
    @Param('u_id', ParseUUIDPipe) u_id: string,
  ) {
    return this.userService.updateUser(bodyData, u_id);
  }

  @Delete('/:u_id')
  deleteUser(@Param('u_id') u_id: string) {
    return this.userService.deleteUser(u_id);
  }
}

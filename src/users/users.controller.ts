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

@Controller('users')
export class UsersController {
  constructor(private UserService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('/u')
  getProfile(@Request() req) {
    const user = this.UserService.findById(req.id);
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

    return this.UserService.updateUser(bodyData, u_id);
  }

  @Delete('/d/:u_id')
  deleteUser(@Param('u_id') u_id: string) {
    //TODO - FAZER FUNÇÃO DE DELETE
    return this.UserService.deleteUser(u_id);
  }
}

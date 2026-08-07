import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  //USE ISSO ANTES PARA DETERMINAR QUE UMA ROTA É PROTEGIDA
  // @UseGuards(AuthGuard)
}

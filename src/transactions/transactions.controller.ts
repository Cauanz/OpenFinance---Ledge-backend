import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('t')
export class TransactionsController {
  @UseGuards(AuthGuard)
  @Post('c')
  createTransaction(@Body() reqBody) {
    //TODO - TERMINAR AS FUNÇÕES E ROTAS DO TRANSACTION E RECURRENCES
  }
}

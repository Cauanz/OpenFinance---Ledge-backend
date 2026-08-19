import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { TransactionsService } from './transactions.service';

@Controller('t')
export class TransactionsController {
  constructor(private readonly transactionServices: TransactionsService) {}

  //ESSA ROTA SÓ PODE SER USADA PARA DEBUG JÁ QUE A ROTA REAL SÓ PODE PEGAR TODAS AS TRANSAÇÕES DE X USUÁRIO
  @UseGuards(AuthGuard)
  @Get()
  getAllTransactions() {
    return this.transactionServices.getAllTransactions();
  }

  @UseGuards(AuthGuard)
  @Get('u/:user_id')
  getUserTransactions(@Param('user_id') user_id: string) {
    // TODO - ROTA NÃO RETORNANDO RESPOSTA NEM ERRO
    if (typeof user_id === 'string') {
      const ts = this.transactionServices.getUserTransactions(user_id);
      console.log(ts);
      return ts;
    }
  }

  @UseGuards(AuthGuard)
  @Get('s/:id')
  getTransaction(@Param('id') t_id: string) {
    if (typeof t_id === 'string') {
      return this.transactionServices.getTransaction(t_id);
    }
  }

  @UseGuards(AuthGuard)
  @Post('c')
  createTransaction(@Body() bodyData, @Req() requestData) {
    return this.transactionServices.createTransaction(bodyData, requestData);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  editTransaction(
    @Body() data: Record<string, any>,
    @Param('id') t_id: string,
  ) {
    if (!t_id) {
      throw new NotFoundException('Missing Id!');
    }

    return this.transactionServices.updateTransaction(t_id, data);
  }
}

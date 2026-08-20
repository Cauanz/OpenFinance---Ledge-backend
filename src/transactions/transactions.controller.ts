import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { TransactionsService } from './transactions.service';
import { TransactionFilterDto } from './transaction-filters.dto';

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
    if (typeof user_id === 'string') {
      const ts = this.transactionServices.getUserTransactions(user_id);
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

  @Get()
  findAll(@Query() filters: TransactionFilterDto) {
    return this.transactionServices.findall(filters);
  }

  //TODO - ROTA AINDA NÃO FUNCIONANDO
  @UseGuards(AuthGuard)
  @Delete('d/:id')
  deleteTransaction(@Param('t_id') t_id: string) {
    return this.transactionServices.deleteTransaction(t_id);
  }
}

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
import { TransactionsService } from './transactions.service';
import { TransactionFilterDto } from './transaction-filters.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('t')
@UseGuards(AuthGuard)
export class TransactionsController {
  constructor(private readonly transactionServices: TransactionsService) {}

  //ESSA ROTA SÓ PODE SER USADA PARA DEBUG JÁ QUE A ROTA REAL SÓ PODE PEGAR TODAS AS TRANSAÇÕES DE X USUÁRIO
  @Get()
  getAllTransactions() {
    return this.transactionServices.getAllTransactions();
  }

  @Get('u/:user_id')
  getUserTransactions(@Param('user_id') user_id: string) {
    if (!user_id) {
      throw new NotFoundException('Missing Id!');
    }
    return this.transactionServices.getUserTransactions(user_id);
  }

  @Get('s/:t_id')
  getTransaction(@Param('t_id') t_id: string) {
    if (!t_id) {
      throw new NotFoundException('Missing Id!');
    }
    return this.transactionServices.getTransaction(t_id);
  }

  @Post('c')
  createTransaction(@Body() bodyData, @Req() requestData) {
    return this.transactionServices.createTransaction(bodyData, requestData);
  }

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

  @Delete('d/:t_id')
  deleteTransaction(@Param('t_id') t_id: string) {
    if (!t_id) {
      throw new NotFoundException('Missing Id!');
    }
    return this.transactionServices.deleteTransaction(t_id);
  }
}

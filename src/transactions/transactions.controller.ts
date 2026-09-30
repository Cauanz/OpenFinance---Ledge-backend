import {
  BadRequestException,
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
import { TransactionServices } from './transactions.service';
import { TransactionFilterDto } from './transaction-filters.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('transactions')
@UseGuards(AuthGuard)
export class TransactionsController {
  constructor(private readonly transactionServices: TransactionServices) {}

  //ESSA ROTA SÓ PODE SER USADA PARA DEBUG JÁ QUE A ROTA REAL SÓ PODE PEGAR TODAS AS TRANSAÇÕES DE X USUÁRIO
  @Get()
  getAllTransactions() {
    return this.transactionServices.getAllTransactions();
  }

  @Get('user/:user_id')
  getUserTransactions(@Param('user_id') user_id: string) {
    if (!user_id) {
      throw new NotFoundException('Missing Id!');
    }
    return this.transactionServices.getUserTransactions(user_id);
  }

  @Get('/:t_id')
  getTransaction(@Param('t_id') t_id: string) {
    if (!t_id) {
      throw new BadRequestException('Missing Id!');
    }
    return this.transactionServices.getTransaction(t_id);
  }

  @Post()
  createTransaction(@Body() bodyData, @Req() requestData) {
    return this.transactionServices.createTransaction(bodyData, requestData);
  }

  @Patch(':id')
  editTransaction(
    @Body() data: Record<string, any>,
    @Param('id') t_id: string,
  ) {
    if (!t_id) {
      throw new BadRequestException('Missing Id!');
    }
    return this.transactionServices.updateTransaction(t_id, data);
  }

  @Get('filters')
  findAll(@Query() filters: TransactionFilterDto) {
    return this.transactionServices.findallfiltered(filters);
  }

  @Delete(':t_id')
  deleteTransaction(@Param('t_id') t_id: string) {
    if (!t_id) {
      throw new BadRequestException('Missing Id!');
    }
    return this.transactionServices.deleteTransaction(t_id);
  }
}

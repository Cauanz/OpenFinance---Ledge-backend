import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
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

@Controller('transactions')
@UseGuards(AuthGuard)
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  //ESSA ROTA SÓ PODE SER USADA PARA DEBUG JÁ QUE A ROTA REAL SÓ PODE PEGAR TODAS AS TRANSAÇÕES DE X USUÁRIO
  @Get()
  getAllTransactions() {
    return this.transactionsService.getAllTransactions();
  }

  @Get('user/:user_id')
  getUserTransactions(@Param('user_id') user_id: string) {
    if (!user_id) {
      throw new BadRequestException('Missing Id!');
    }
    return this.transactionsService.getUserTransactions(user_id);
  }

  @Get('filters')
  findAllFiltered(@Query() filters: TransactionFilterDto) {
    return this.transactionsService.findallfiltered(filters);
  }

  @Get('/:t_id')
  getTransaction(@Param('t_id') t_id: string) {
    if (!t_id) {
      throw new BadRequestException('Missing Id!');
    }
    return this.transactionsService.getTransaction(t_id);
  }

  @Post()
  createTransaction(@Body() bodyData, @Req() requestData) {
    return this.transactionsService.createTransaction(bodyData, requestData);
  }

  @Patch(':id')
  editTransaction(
    @Body() data: Record<string, any>,
    @Param('id') t_id: string,
  ) {
    if (!t_id) {
      throw new BadRequestException('Missing Id!');
    }
    return this.transactionsService.updateTransaction(t_id, data);
  }

  @Delete(':t_id')
  deleteTransaction(@Param('t_id') t_id: string) {
    if (!t_id) {
      throw new BadRequestException('Missing Id!');
    }
    return this.transactionsService.deleteTransaction(t_id);
  }
}

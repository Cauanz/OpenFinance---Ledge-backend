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
  @Get(':id')
  getUserTransactions() {
    return this.transactionServices.getUserTransactions(id);
  }

  @UseGuards(AuthGuard)
  @Post('c')
  createTransaction(@Body() bodyData, @Req() requestData) {
    return this.transactionServices.createTransaction(bodyData, requestData);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  editTransaction(@Body() data: Record<string, any>, @Param() params: any) {
    const id = params.id;

    if (!id) {
      throw new NotFoundException('Missing Id!');
    }

    return this.transactionServices.updateTransaction(id, data);
  }
}

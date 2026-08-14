import {
  Body,
  Controller,
  Get,
  Head,
  Headers,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { TransactionsService } from './transactions.service';

@Controller('t')
export class TransactionsController {
  constructor(private readonly transactionServices: TransactionsService) {}

  @UseGuards(AuthGuard)
  @Post('c')
  createTransaction(
    @Body() bodyData: Record<string, any>,
    @Req() requestData: Record<string, any>,
  ) {
    return this.transactionServices.createTransaction(bodyData, requestData);
    //TODO - TERMINAR AS FUNÇÕES E ROTAS DO TRANSACTION E RECURRENCES
  }

  @Patch(':id')
  editTransaction(@Body() data: Record<string, any>, @Param() params: any) {
    const id: string = params.id;

    if (!id) {
      throw new NotFoundException('Missing Id!');
    }

    return this.transactionServices.updateTransaction(id, data);
  }
}

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('t')
export class TransactionsController {
  @UseGuards(AuthGuard)
  @Post('c')
  createTransaction(@Body() reqBody) {
    //TODO - TERMINAR AS FUNÇÕES E ROTAS DO TRANSACTION E RECURRENCES
  }

  @Put(':id')
  editTransaction(@Req() request: Request, @Param() params: any) {
    console.log(request.body);
    console.log(params.id);
  }
}

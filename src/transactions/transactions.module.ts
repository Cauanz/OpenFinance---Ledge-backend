import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transactions } from './entities/transaction.entity';
import { UsersModule } from '../users/users.module';
import { Recurrences } from '../recurrences/entities/recurrences.entity';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService],
  imports: [TypeOrmModule.forFeature([Transactions, Recurrences]), UsersModule],
  exports: [TypeOrmModule],
})
export class TransactionsModule {}

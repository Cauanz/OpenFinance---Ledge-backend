import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transactions } from './entities/transaction.entity';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService, UsersService],
  imports: [TypeOrmModule.forFeature([Transactions]), UsersModule],
  exports: [TypeOrmModule],
})
export class TransactionsModule {}

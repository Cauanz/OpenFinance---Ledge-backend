import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transactions } from './entities/transaction.entity';
// import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
// import { UsersModule } from '../users/users.module';
// import { RecurrencesModule } from '../recurrences/recurrences.module';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService],
  imports: [TypeOrmModule.forFeature([Transactions]), UsersModule],
  exports: [TypeOrmModule],
})
export class TransactionsModule {}

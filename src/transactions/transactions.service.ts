import { Injectable } from '@nestjs/common';
import { Transactions } from './entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transactions)
    private transactionsRepo: Repository<Transactions>,
  ) {}

  async getTransaction(id: string): Promise<Transactions | null> {
    return this.transactionsRepo.findOne({
      where: { id: id },
    });
  }
}

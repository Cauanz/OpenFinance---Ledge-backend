import { Injectable, NotFoundException } from '@nestjs/common';
import { Transactions } from './entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transactions)
    private transactionsRepo: Repository<Transactions>,
    private readonly usersService: UsersService,
  ) {}

  async getTransaction(id: string): Promise<Transactions | null> {
    return this.transactionsRepo.findOne({
      where: { id: id },
    });
  }

  // async createTransaction(dataobj: object) {
  //   const user = this.usersService.findById(dataobj.user_id);
  // }

  async updateTransaction(id: string, data: object) {
    const t = await this.transactionsRepo.findOne({ where: { id } });

    if (!t) {
      throw new NotFoundException('Transaction not found!');
    }

    Object.assign(t, data);

    return this.transactionsRepo.save(t);
  }
}

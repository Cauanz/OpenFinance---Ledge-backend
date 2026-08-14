import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Transactions } from './entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

type TransactinObj = {
  id: string;
  user_id: User;
  title: string;
  amount: number;
  type: string;
  date: Date;
  status: string;
  recurrence_id: string;
  created_at: Date;
};

type AuthObj = {
  user: {
    username: string;
  };
};

type CreateTransactionBody = {
  title: string;
  amount: number;
  type: string;
  date: Date;
  status: string;
  recurrence_id: string | null;
};

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

  async createTransaction(reqData: AuthObj, bodyData: CreateTransactionBody) {
    const user = await this.usersService.findByUsername(reqData.user.username);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const newT: TransactinObj = {
      user_id: { id: user.id },
      title: bodyData.title,
      amount: bodyData.amount,
      type: bodyData.type,
      status: bodyData.status,
      ...(bodyData.recurrence_id && {
        recurrence: { id: bodyData.recurrence_id },
      }),
    };

    const t = this.transactionsRepo.create(newT);

    return this.transactionsRepo.save(t);
  }

  async updateTransaction(id: string, data: Partial<Transactions>) {
    const t = await this.transactionsRepo.findOne({ where: { id } });

    if (!t) {
      throw new NotFoundException('Transaction not found!');
    }

    Object.assign(t, data);

    return this.transactionsRepo.save(t);
  }
}

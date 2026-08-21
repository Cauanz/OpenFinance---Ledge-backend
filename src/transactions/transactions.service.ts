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
import { Recurrences } from 'src/recurrences/entities/recurrences.entity';
import { TransactionFilterDto } from './transaction-filters.dto';

type TransactinObj = {
  id: string;
  user_id: User;
  title: string;
  amount: number;
  type: string;
  date: Date;
  status: string;
  recurrence_id: Recurrences | null;
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
    @InjectRepository(Recurrences)
    private readonly recurrencesRepo: Repository<Recurrences>,
    private readonly usersService: UsersService,
  ) {}

  async findall(filters: TransactionFilterDto) {
    const { period } = filters;

    const now = new Date();

    let startDate: Date | undefined;

    if (period === 'today') {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }

    if (period === 'week') {
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }

    if (period === 'month') {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    if (period === 'year') {
      startDate = new Date(now.getFullYear(), 0, 1);
    }

    return this.transactionsRepo.find({
      where: {
        created_at: startDate,
      },
    });
  }

  async getAllTransactions(): Promise<Transactions[] | null> {
    return this.transactionsRepo.find();
  }

  async getTransaction(id: string): Promise<Transactions | null> {
    return this.transactionsRepo.findOne({
      where: { id: id },
    });
  }

  async getUserTransactions(userId: string): Promise<Transactions[]> {
    return this.transactionsRepo.find({
      where: {
        user_id: {
          id: userId,
        },
      },
      relations: ['user_id', 'recurrence_id'],
    });
  }

  async createTransaction(reqData: CreateTransactionBody, bodyData: AuthObj) {
    const user = await this.usersService.findByUsername(bodyData.user.username);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const recurrence = reqData.recurrence_id
      ? await this.recurrencesRepo.findOne({
          where: { id: Number(reqData.recurrence_id) },
        })
      : null;

    const newT: TransactinObj = this.transactionsRepo.create({
      ...reqData,
      user_id: user,
      recurrence_id: recurrence,
    });

    const t = await this.transactionsRepo.save(newT);

    return t;
  }

  async updateTransaction(id: string, data: Partial<Transactions>) {
    const t = await this.transactionsRepo.findOne({ where: { id } });

    if (!t) {
      throw new NotFoundException('Transaction not found!');
    }

    Object.assign(t, data);

    return this.transactionsRepo.save(t);
  }

  async deleteTransaction(t_id: string) {
    console.log(t_id);
    const result = await this.transactionsRepo.delete({ id: t_id });

    if (result.affected === 0) {
      throw new NotFoundException('Transaction not found!');
    }

    return result;
  }
}

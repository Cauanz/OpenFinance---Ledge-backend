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
  recurrence_id: Recurrences | null;
};

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transactions)
    private transactionsRepo: Repository<Transactions>,
    private readonly usersService: UsersService,
  ) {}

  //TODO - CRIAR FUNÇÃO findall PARA O ENDPOINT COM QUERY

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

    const newT: TransactinObj = this.transactionsRepo.create({
      ...reqData,
      user_id: user,
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
}

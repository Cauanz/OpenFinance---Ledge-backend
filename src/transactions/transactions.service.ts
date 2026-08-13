import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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

  async createTransaction(reqData: object, bodyData: object) {
    const user = this.usersService.findByUsername(reqData.user.username);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const newT = {
      user_id: user.id,
      title: bodyData
    };
  }

  async updateTransaction(id: string, data: object) {
    const t = await this.transactionsRepo.findOne({ where: { id } });

    if (!t) {
      throw new NotFoundException('Transaction not found!');
    }

    Object.assign(t, data);

    return this.transactionsRepo.save(t);
  }
}

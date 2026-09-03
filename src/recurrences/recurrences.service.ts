import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recurrences } from './entities/recurrences.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { DeleteResult } from 'typeorm/browser';

type AuthObj = {
  user: {
    username: string;
  };
};

type CreateRecurrenceBody = {
  title: string;
  amount: number;
  type: string;
  frequency: string;
  active: boolean;
  start_date: Date;
  end_date: Date;
};

@Injectable()
export class RecurrencesService {
  constructor(
    @InjectRepository(Recurrences)
    private recurrencesRepo: Repository<Recurrences>,
    // private usersRepo: Repository<User>,
    private readonly usersService: UsersService,
  ) {}

  async getAllRecurrences() {
    return this.recurrencesRepo.find();
  }

  async getRecurrenceById(id: string): Promise<Recurrences | null> {
    return this.recurrencesRepo.findOne({ where: { id: id } });
  }

  async createRecurrence(
    bodyData: CreateRecurrenceBody,
    reqData: AuthObj,
  ): Promise<Recurrences | null> {
    const user = await this.usersService.findByUsername(reqData.user.username);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const newR = this.recurrencesRepo.create({
      ...bodyData,
      user_id: user,
    });

    const r = await this.recurrencesRepo.save(newR);

    return r;
  }

  async deleteRecurrence(id: string): Promise<DeleteResult | null> {
    const recurrence = await this.recurrencesRepo.findOne({ where: { id } });

    if (!recurrence) {
      throw new UnauthorizedException('Recurrence not found!');
    }

    const deleted = await this.recurrencesRepo.delete({ id });

    return deleted;
  }
}

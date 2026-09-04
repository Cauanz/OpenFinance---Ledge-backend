import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
    const recurrences = await this.recurrencesRepo.find();
    if (recurrences.length <= 0) {
      throw new NotFoundException('No recurrences were found!');
    }

    return recurrences;
  }

  async getRecurrenceById(id: string): Promise<Recurrences | null> {
    const recurrence = await this.recurrencesRepo.findOne({
      where: { id: id },
    });

    if (!recurrence) {
      throw new NotFoundException('The recurrence was not found!');
    }

    return recurrence;
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

  async updateRecurrence(data: Partial<Recurrences>, r_id: string) {
    const r = await this.recurrencesRepo.findOne({ where: { id: r_id } });

    if (!r) {
      throw new NotFoundException('The recurrence was not found!');
    }

    Object.assign(r, data);

    return this.recurrencesRepo.save(r);
  }

  async pauseRecurrence(r_id: string) {
    const r = await this.recurrencesRepo.findOne({ where: { id: r_id } });

    if (!r) {
      throw new NotFoundException('The recurrence was not found!');
    }

    const paused = await this.recurrencesRepo.update(r_id, { active: false });

    return paused;
  }

  async playRecurrence(r_id: string) {
    const r = await this.recurrencesRepo.findOne({ where: { id: r_id } });

    if (!r) {
      throw new NotFoundException('The recurrence was not found!');
    }

    const resume = await this.recurrencesRepo.update(r_id, { active: true });

    return resume;
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

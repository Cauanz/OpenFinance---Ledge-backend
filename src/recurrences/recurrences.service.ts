import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recurrences } from './entities/recurrences.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RecurrencesService {
  constructor(
    @InjectRepository(Recurrences)
    private recurrencesRepo: Repository<Recurrences>,
  ) {}

  async getAllRecurrences() {
    return this.recurrencesRepo.find();
  }

  async getRecurrenceById(id: string): Promise<Recurrences | null> {
    return this.recurrencesRepo.findOne({ where: { id: id } });
  }
}

import { Module } from '@nestjs/common';
import { RecurrencesController } from './recurrences.controller';
import { RecurrencesService } from './recurrences.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recurrences } from './entities/recurrences.entity';

@Module({
  controllers: [RecurrencesController],
  providers: [RecurrencesService],
  imports: [TypeOrmModule.forFeature([Recurrences])],
  exports: [TypeOrmModule],
})
export class RecurrencesModule {}

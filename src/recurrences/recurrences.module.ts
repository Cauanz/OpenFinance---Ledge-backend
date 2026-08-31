import { Module } from '@nestjs/common';
import { RecurrencesController } from './recurrences.controller';
import { RecurrencesService } from './recurrences.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recurrences } from './entities/recurrences.entity';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [RecurrencesController],
  providers: [RecurrencesService, UsersService],
  imports: [TypeOrmModule.forFeature([Recurrences]), UsersModule],
  exports: [TypeOrmModule],
})
export class RecurrencesModule {}

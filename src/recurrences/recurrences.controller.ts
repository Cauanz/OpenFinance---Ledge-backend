import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { RecurrencesService } from './recurrences.service';

@Controller('recurrences')
@UseGuards(AuthGuard)
export class RecurrencesController {
  constructor(private readonly recurrencesServices: RecurrencesService) {}

  //GET
  @Get()
  getAllRecurrences() {
    return this.recurrencesServices.getAllRecurrences();
  }

  //GET ONE
  @Get('/s/:id')
  getRecurrenceById(@Param('id') id: string) {
    return this.recurrencesServices.getRecurrenceById(id);
  }

  //POST
  //PATCH
  //PATCH /RECPAUSE
  //PATCH /RECPLAY
  //DELETE
}

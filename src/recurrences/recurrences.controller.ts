import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
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
  @Post()
  createRecurrence(@Body() bodyData, @Req() reqData) {
    return this.recurrencesServices.createRecurrence(bodyData, reqData);
  }

  //PATCH
  @Put('/p/:r_id')
  updateRecurrence(@Body() bodyData, @Param('r_id') r_id: string) {
    return this.recurrencesServices.updateRecurrence(bodyData, r_id);
  }

  //PATCH /RECPAUSE
  @Patch('/recpause/:r_id')
  pauseRecurrence(@Param('r_id') r_id: string) {
    return this.recurrencesServices.pauseRecurrence(r_id);
  }

  //PATCH /RECPLAY
  @Patch('/recplay/:r_id')
  resumeRecurrence(@Param('r_id') r_id: string) {
    return this.recurrencesServices.playRecurrence(r_id);
  }

  //DELETE
  @Delete('/d/:id')
  deleteRecurrence(@Param('id') id: string) {
    return this.recurrencesServices.deleteRecurrence(id);
  }
}

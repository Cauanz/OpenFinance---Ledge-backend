import { Body, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {}

  //TODO - CONTINUAR CONFIG DO CONFIGSERVICE PARA LER .ENV
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

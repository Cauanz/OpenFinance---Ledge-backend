import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
// import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    // private configService: ConfigService,
  ) {}

  //TODO - CONTINUAR CONFIG DO CONFIGSERVICE PARA LER .ENV
  // @Get()
  // getHello(): string {
  //   // return this.appService.getHello();
  // }

  // @Get()
  // getSecret(): string | undefined {
  //   const secret = this.configService.get<string>(process.env.SECRET);

  //   return secret;
  // }
}

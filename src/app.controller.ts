import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import { NewFoglalas } from './folalas.dto.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async getHello() {
    return {
      title: 'Foglalás',
      foglalasok: await this.appService.getFoglalasok()
    }
  }

 
}

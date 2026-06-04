import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseMessage } from './common/decorators/response-message.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ResponseMessage('Get hello successfully')
  getHello(): string {
    const result = this.appService.getHello();

    return result;
  }
}

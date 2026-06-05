import { Controller, Get, Logger, Post } from '@nestjs/common';
import { StaffsService } from './staffs.service';

@Controller('staffs')
export class StaffsController {
  constructor(private readonly staffsService: StaffsService) {}

  private readonly logger = new Logger(StaffsController.name);

  @Post()
  create() {
    this.logger.log('Create Staff Controller');

    const message = this.staffsService.createStaff();
    this.logger.debug(`Message from service: ${message}`);

    return message;
  }
}

import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { StaffsService } from './staffs.service';
import { CreateStaffDto } from './create-staff.dto';

@Controller('staffs')
export class StaffsController {
  constructor(private readonly staffsService: StaffsService) {}

  private readonly logger = new Logger(StaffsController.name);

  @Post()
  create(@Body() createStaffDto: CreateStaffDto) {
    this.logger.log('Create Staff Controller');
    this.logger.debug('Create Staff DTO: ', createStaffDto);

    const message = this.staffsService.createStaff();
    this.logger.debug(`Message from service: ${message}`);

    return message;
  }
}

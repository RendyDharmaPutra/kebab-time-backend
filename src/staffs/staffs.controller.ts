import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { StaffsService } from './staffs.service';
import { CreateStaffDto } from './create-staff.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RoleName } from 'src/roles/role-enum';

@Controller('staffs')
export class StaffsController {
  constructor(private readonly staffsService: StaffsService) {}

  private readonly logger = new Logger(StaffsController.name);

  @Get()
  @Roles(RoleName.OWNER)
  async list() {
    this.logger.log('Get List Staffs Controller');

    const message = await this.staffsService.getListStaffs();
    this.logger.debug(`Message from service: ${message}`);

    return message;
  }

  @Post()
  @Roles(RoleName.OWNER)
  async create(@Body() createStaffDto: CreateStaffDto) {
    this.logger.log('Create Staff Controller');
    this.logger.debug('Create Staff DTO: ', createStaffDto);

    const message = await this.staffsService.createStaff(createStaffDto);
    this.logger.debug(`Message from service: ${message}`);

    return message;
  }
}

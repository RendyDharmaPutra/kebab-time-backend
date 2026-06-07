import { Controller, Get, Logger } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { RoleName } from 'src/roles/role-enum';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}
  private readonly logger = new Logger(CustomersController.name);

  @Get()
  @Roles(RoleName.OWNER)
  async list() {
    this.logger.log('Get List Customers Controller');

    const message = await this.customersService.getListCustomers();
    this.logger.debug(`Message from service: ${message}`);

    return message;
  }
}

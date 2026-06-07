import { Controller, Post, Body, Logger } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './create-supplier.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RoleName } from 'src/roles/role-enum';

@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  private readonly logger = new Logger(SuppliersController.name);

  @Post()
  @Roles(RoleName.OWNER)
  async create(@Body() createSupplierDto: CreateSupplierDto) {
    this.logger.log('Create Supplier Controller');
    this.logger.debug('Create Supplier DTO: ', createSupplierDto);

    const message =
      await this.suppliersService.createSupplier(createSupplierDto);
    this.logger.debug(`Message from service: ${message}`);

    return message;
  }
}

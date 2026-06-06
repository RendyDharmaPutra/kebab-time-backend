import { Injectable, Logger } from '@nestjs/common';
import { Customer } from './customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from 'src/auths/auth.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
  ) {}
  private readonly logger = new Logger(CustomersService.name);

  async createCustomer(customerData: {
    fullname: string;
    address: string;
    phone: string;
    auth: Auth;
  }) {
    this.logger.log('Create Customer Service');
    this.logger.debug(`Customer Data: ${JSON.stringify(customerData)}`);

    const customer = this.customerRepo.create(customerData);

    return await this.customerRepo.save(customer);
  }
}

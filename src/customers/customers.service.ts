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

  async getListCustomers() {
    this.logger.log('Get List Customers Service');

    const result = await this.customerRepo.find({
      relations: {
        auth: true,
      },
      select: {
        auth: {
          email: true,
        },
      },
    });
    this.logger.debug(`List Customers: ${JSON.stringify(result)}`);

    return result;
  }

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

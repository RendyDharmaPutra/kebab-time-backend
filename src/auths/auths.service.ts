import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './auth.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { PasswordService } from 'src/common/services/password.service';
import { Role } from 'src/roles/role.entity';
import { RegisterDto } from './register.dto';
import { RoleName } from 'src/roles/role-enum';
import { CustomersService } from 'src/customers/customers.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthsService {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly customerService: CustomersService,

    @InjectRepository(Auth)
    private readonly authRepo: Repository<Auth>,

    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
  ) {}
  private readonly logger = new Logger(AuthsService.name);

  async createCredential(credential: {
    email: string;
    password: string;
    role: Role;
  }) {
    this.logger.log('Create Credential Service');
    this.logger.debug(`Credential: ${JSON.stringify(credential)}`);

    const hashedPassword = await this.passwordService.hash(credential.password);
    this.logger.debug(`Hashed Password: ${hashedPassword}`);

    try {
      const credentialResult = this.authRepo.create({
        ...credential,
        password: hashedPassword,
      });
      return await this.authRepo.save(credentialResult);
    } catch (error) {
      this.logger.error('Credential Save Failed', error);

      if (error instanceof QueryFailedError) {
        const pgError = error as QueryFailedError & {
          code?: string;
        };

        if (pgError.code === '23505')
          throw new HttpException(
            {
              code: 'AUTH_EMAIL_DUPLICATED',
              message: 'Email already registered',
            },
            HttpStatus.BAD_REQUEST,
          );
      }

      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async register(dto: RegisterDto) {
    this.logger.log('Register Service');
    this.logger.debug(`Register DTO: ${JSON.stringify(dto)}`);

    const role = await this.roleRepo.findOneBy({ name: RoleName.CUSTOMER });
    this.logger.debug(`Role: ${JSON.stringify(role)}`);

    const credential = {
      email: dto.email,
      password: dto.password,
      role,
    };
    const credentialResult = await this.createCredential(credential);
    this.logger.debug(
      `Credential Saved Result: ${JSON.stringify(credentialResult)}`,
    );

    const customer = {
      fullname: dto.fullname,
      address: dto.address,
      phone: dto.phone,
      auth: credentialResult,
    };
    const customerResult = await this.customerService.createCustomer(customer);
    this.logger.debug(
      `Customer Saved Result: ${JSON.stringify(customerResult)}`,
    );

    return 'Success Registering Customer';
  }

  async login(dto: LoginDto) {
    this.logger.log('Login Service');
    this.logger.debug(`Login DTO: ${JSON.stringify(dto)}`);

    const credential = await this.authRepo.findOneBy({ email: dto.email });
    this.logger.debug(`Credential: ${JSON.stringify(credential)}`);

    const isPasswordValid = await this.passwordService.compare(
      dto.password,
      credential.password,
    );
    this.logger.debug(`Password Validation: ${isPasswordValid}`);

    if (!isPasswordValid)
      throw new HttpException(
        {
          code: 'AUTH_PASSWORD_MISMATCH',
          message: 'Password does not match',
        },
        HttpStatus.BAD_REQUEST,
      );

    return 'Success Logging In';
  }
}

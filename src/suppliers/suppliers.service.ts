import { Injectable, Logger } from '@nestjs/common';
import { CreateSupplierDto } from './create-supplier.dto';
import { PasswordService } from 'src/common/services/password.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/roles/role.entity';
import { RoleName } from 'src/roles/role-enum';
import { AuthsService } from 'src/auths/auths.service';
import { Supplier } from './supplier.entity';

@Injectable()
export class SuppliersService {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly authsService: AuthsService,

    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,

    @InjectRepository(Supplier)
    private readonly supplierRepo: Repository<Supplier>,
  ) {}

  private readonly logger = new Logger(SuppliersService.name);

  async getListSuppliers() {
    this.logger.log('Get List Suppliers Service');

    const result = await this.supplierRepo.find({
      relations: {
        auth: true,
      },
      select: {
        auth: {
          email: true,
        },
      },
    });
    this.logger.debug(`List Suppliers: ${JSON.stringify(result)}`);

    return result;
  }

  async createSupplier(dto: CreateSupplierDto) {
    this.logger.log('Create Supplier Service');

    const rawPassword = await this.passwordService.generateUserPassword(
      dto.email,
      dto.phone,
    );
    this.logger.debug(`Generated Password: ${rawPassword}`);

    const role = await this.roleRepo.findOneBy({ name: RoleName.SUPPLIER });
    this.logger.debug(`Role: ${JSON.stringify(role)}`);

    const credential = {
      email: dto.email,
      password: rawPassword,
      role,
    };
    const credentialResult =
      await this.authsService.createCredential(credential);
    this.logger.debug(
      `Credential Saved Result: ${JSON.stringify(credentialResult)}`,
    );

    const supplier = this.supplierRepo.create({
      name: dto.name,
      address: dto.address,
      phone: dto.phone,
      auth: credentialResult,
    });
    const supplierResult = await this.supplierRepo.save(supplier);
    this.logger.debug(
      `Supplier Saved Result: ${JSON.stringify(supplierResult)}`,
    );

    return 'Supplier Created Successfully';
  }
}

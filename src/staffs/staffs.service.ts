import { Injectable, Logger } from '@nestjs/common';
import { CreateStaffDto } from './create-staff.dto';
import { PasswordService } from 'src/common/services/password.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/roles/role.entity';
import { Repository } from 'typeorm';
import { RoleName } from 'src/roles/role-enum';

@Injectable()
export class StaffsService {
  constructor(
    private readonly passwordService: PasswordService,

    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
  ) {}
  private readonly logger = new Logger(StaffsService.name);

  async createStaff(dto: CreateStaffDto) {
    this.logger.log('Create Staff Service');

    const rawPassword = await this.passwordService.generateUserPassword(
      dto.email,
      dto.phone,
    );
    this.logger.debug(`Generated Password: ${rawPassword}`);

    const role = await this.roleRepo.findOneBy({ name: RoleName.STAFF });
    this.logger.debug(`Role: ${JSON.stringify(role)}`);

    return 'Create Staff Service';
  }
}

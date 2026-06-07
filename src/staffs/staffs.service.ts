import { Injectable, Logger } from '@nestjs/common';
import { CreateStaffDto } from './create-staff.dto';
import { PasswordService } from 'src/common/services/password.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/roles/role.entity';
import { Repository } from 'typeorm';
import { RoleName } from 'src/roles/role-enum';
import { AuthsService } from 'src/auths/auths.service';
import { Staff } from './staff.entity';

@Injectable()
export class StaffsService {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly authsService: AuthsService,

    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,

    @InjectRepository(Staff)
    private readonly staffRepo: Repository<Staff>,
  ) {}
  private readonly logger = new Logger(StaffsService.name);

  async getListStaffs() {
    this.logger.log('Get List Staffs Service');

    const result = await this.staffRepo.find({
      relations: {
        auth: true,
      },
      select: {
        auth: {
          email: true,
        },
      },
    });
    this.logger.debug(`List Staffs: ${JSON.stringify(result)}`);

    return result;
  }

  async createStaff(dto: CreateStaffDto) {
    this.logger.log('Create Staff Service');

    const rawPassword = await this.passwordService.generateUserPassword(
      dto.email,
      dto.phone,
    );
    this.logger.debug(`Generated Password: ${rawPassword}`);

    const role = await this.roleRepo.findOneBy({ name: RoleName.STAFF });
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

    const staff = this.staffRepo.create({
      fullname: dto.fullname,
      address: dto.address,
      phone: dto.phone,
      auth: credentialResult,
    });
    const staffResult = await this.staffRepo.save(staff);
    this.logger.debug(`Staff Saved Result: ${JSON.stringify(staffResult)}`);

    return 'Staff Created Successfully';
  }
}

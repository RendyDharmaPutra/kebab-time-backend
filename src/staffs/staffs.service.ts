import { Injectable, Logger } from '@nestjs/common';
import { CreateStaffDto } from './create-staff.dto';
import { PasswordService } from 'src/common/services/password.service';

@Injectable()
export class StaffsService {
  constructor(private readonly passwordService: PasswordService) {}
  private readonly logger = new Logger(StaffsService.name);

  async createStaff(dto: CreateStaffDto) {
    this.logger.log('Create Staff Service');

    const rawPassword = await this.passwordService.generateUserPassword(
      dto.email,
      dto.phone,
    );
    this.logger.debug(`Generated Password: ${rawPassword}`);

    return 'Create Staff Service';
  }
}

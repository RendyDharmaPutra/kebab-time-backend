import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class StaffsService {
  private readonly logger = new Logger(StaffsService.name);

  createStaff() {
    this.logger.log('Create Staff Service');

    return 'Create Staff Service';
  }
}

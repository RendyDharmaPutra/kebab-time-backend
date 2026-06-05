import { Module } from '@nestjs/common';
import { StaffsService } from './staffs.service';
import { StaffsController } from './staffs.controller';
import { PasswordService } from 'src/common/services/password.service';

@Module({
  providers: [StaffsService, PasswordService],
  controllers: [StaffsController],
})
export class StaffsModule {}

import { Module } from '@nestjs/common';
import { StaffsService } from './staffs.service';
import { StaffsController } from './staffs.controller';

@Module({
  providers: [StaffsService],
  controllers: [StaffsController]
})
export class StaffsModule {}

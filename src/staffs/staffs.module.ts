import { Module } from '@nestjs/common';
import { StaffsService } from './staffs.service';
import { StaffsController } from './staffs.controller';
import { PasswordService } from 'src/common/services/password.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/roles/role.entity';
import { AuthsModule } from 'src/auths/auths.module';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), AuthsModule],
  providers: [StaffsService, PasswordService],
  controllers: [StaffsController],
})
export class StaffsModule {}

import { Module } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { PasswordService } from 'src/common/services/password.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './auth.entity';
import { AuthsController } from './auths.controller';
import { Role } from 'src/roles/role.entity';
import { CustomersModule } from 'src/customers/customers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Auth, Role]), CustomersModule],
  providers: [AuthsService, PasswordService],
  exports: [AuthsService],
  controllers: [AuthsController],
})
export class AuthsModule {}

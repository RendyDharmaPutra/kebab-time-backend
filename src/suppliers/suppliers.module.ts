import { Module } from '@nestjs/common';
import { SuppliersController } from './suppliers.controller';
import { SuppliersService } from './suppliers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from './supplier.entity';
import { Role } from 'src/roles/role.entity';
import { AuthsModule } from 'src/auths/auths.module';
import { PasswordService } from 'src/common/services/password.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Supplier]), AuthsModule],
  controllers: [SuppliersController],
  providers: [SuppliersService, PasswordService],
})
export class SuppliersModule {}

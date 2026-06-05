import { Module } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { PasswordService } from 'src/common/services/password.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Auth])],
  providers: [AuthsService, PasswordService],
  exports: [AuthsService],
})
export class AuthsModule {}

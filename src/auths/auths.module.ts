import { Module } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { PasswordService } from 'src/common/services/password.service';

@Module({
  providers: [AuthsService, PasswordService],
})
export class AuthsModule {}

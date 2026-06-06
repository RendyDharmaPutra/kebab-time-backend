import { Module } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { PasswordService } from 'src/common/services/password.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './auth.entity';
import { AuthsController } from './auths.controller';
import { Role } from 'src/roles/role.entity';
import { CustomersModule } from 'src/customers/customers.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth, Role]),
    CustomersModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '7d',
        },
      }),
    }),
  ],
  providers: [AuthsService, PasswordService],
  exports: [AuthsService],
  controllers: [AuthsController],
})
export class AuthsModule {}

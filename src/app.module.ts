import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './common/config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthsModule } from './auths/auths.module';
import { StaffsModule } from './staffs/staffs.module';
import { RolesModule } from './roles/roles.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),

        entities: [__dirname + '/**/*.entity.{ts,js}'],
        autoLoadEntities: true,
        synchronize: true,

        logging: true,
      }),
    }),
    AuthsModule,
    StaffsModule,
    RolesModule,
    SuppliersModule,
    CustomersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

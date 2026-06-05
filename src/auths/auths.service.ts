import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './auth.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { PasswordService } from 'src/common/services/password.service';
import { Role } from 'src/roles/role.entity';
import { RegisterDto } from './register.dto';

@Injectable()
export class AuthsService {
  constructor(
    private readonly passwordService: PasswordService,

    @InjectRepository(Auth)
    private readonly authRepo: Repository<Auth>,
  ) {}
  private readonly logger = new Logger(AuthsService.name);

  async createCredential(credential: {
    email: string;
    password: string;
    role: Role;
  }) {
    this.logger.log('Create Credential Service');
    this.logger.debug(`Credential: ${JSON.stringify(credential)}`);

    const hashedPassword = await this.passwordService.hash(credential.password);
    this.logger.debug(`Hashed Password: ${hashedPassword}`);

    try {
      const credentialResult = this.authRepo.create({
        ...credential,
        password: hashedPassword,
      });
      return await this.authRepo.save(credentialResult);
    } catch (error) {
      this.logger.error('Credential Save Failed', error);

      if (error instanceof QueryFailedError) {
        const pgError = error as QueryFailedError & {
          code?: string;
        };

        if (pgError.code === '23505')
          throw new HttpException(
            {
              code: 'AUTH_EMAIL_DUPLICATED',
              message: 'Email already registered',
            },
            HttpStatus.BAD_REQUEST,
          );
      }

      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async register(dto: RegisterDto) {
    this.logger.log('Register Service');
    this.logger.debug(`Register DTO: ${JSON.stringify(dto)}`);

    if (dto.password !== dto.confirmPassword)
      throw new HttpException(
        {
          code: 'AUTH_PASSWORD_MISMATCH',
          message: 'Password does not match',
        },
        HttpStatus.BAD_REQUEST,
      );

    return 'Success Registering Customer';
  }
}

import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './auth.entity';
import { QueryFailedError, Repository } from 'typeorm';

@Injectable()
export class AuthsService {
  constructor(
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

    try {
      const newCredential = this.authRepo.create(credential);
      return await this.authRepo.save(newCredential);
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
}

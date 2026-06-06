import {
  Controller,
  Logger,
  Post,
  Body,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { AuthsService } from './auths.service';
import { RegisterDto } from './register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auths')
export class AuthsController {
  constructor(private readonly authsService: AuthsService) {}

  private readonly logger = new Logger(AuthsController.name);

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    this.logger.log('Register Controller');
    this.logger.debug('Register DTO: ', registerDto);

    if (registerDto.password !== registerDto.confirmPassword)
      throw new HttpException(
        {
          code: 'AUTH_PASSWORD_MISMATCH',
          message: 'Password does not match',
        },
        HttpStatus.BAD_REQUEST,
      );

    const message = await this.authsService.register(registerDto);
    this.logger.debug(`Message from service: ${message}`);

    return message;
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    this.logger.log('Login Controller');
    this.logger.debug('Login DTO: ', loginDto);

    const message = await this.authsService.login(loginDto);
    this.logger.debug(`Message from service: ${message}`);

    return message;
  }
}

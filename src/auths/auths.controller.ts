import { Controller, Logger, Post, Body } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { RegisterDto } from './register.dto';

@Controller('auths')
export class AuthsController {
  constructor(private readonly authsService: AuthsService) {}

  private readonly logger = new Logger(AuthsController.name);

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    this.logger.log('Register Controller');
    this.logger.debug('Register DTO: ', registerDto);

    const message = await this.authsService.register(registerDto);
    this.logger.debug(`Message from service: ${message}`);

    return message;
  }
}

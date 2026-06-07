import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from './../../../node_modules/@types/jsonwebtoken/index.d';
import { Injectable, Logger } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  public readonly logger = new Logger(JwtStrategy.name);

  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    this.logger.log('JwtStrategy validate');
    this.logger.debug('JwtPayload: ', payload);
    return payload;
  }
}

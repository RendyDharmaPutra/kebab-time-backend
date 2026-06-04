import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RESPONSE_MESSAGE } from '../decorators/response-message.decorator';
import { ApiResponseDto } from '../dto/api-response.dto';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept<T>(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponseDto<T>> {
    const message =
      this.reflector.get<string>(RESPONSE_MESSAGE, context.getHandler()) ??
      'Success';

    return next.handle().pipe(
      map((data) => {
        if (data && data.items && data.meta) {
          return new ApiResponseDto(true, message, data.items, data.meta);
        }

        return new ApiResponseDto(true, message, data);
      }),
    );
  }
}

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { BasicException } from './BasicException';
import { ErrorCode } from './ErrorCode';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    //ctx를 실행환경에서 가져와서 http 상태 코드를 할당한다
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let code;
    let status;

    if (exception instanceof BasicException) {
      code = exception.code;
      status = exception.getStatus();
    } else if (exception instanceof HttpException) {
      code = ErrorCode.NEST_OFFER;
      status = exception.getStatus();
    } else {
      //서버 에러 (500 또는 nest 제공 에러 )
      status = 500;
      code = ErrorCode.INTERNAL_SERVER_ERROR;
    }

    response.status(status).json({
      code,
      message:
        exception instanceof HttpException
          ? exception.getResponse()
          : (exception as any).message,
      timestamp: new Date().toISOString(),
    });
  }
}

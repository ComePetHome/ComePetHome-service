import { HttpException } from '@nestjs/common';
import { ErrorCode } from './ErrorCode';

// 커스텀 exception에 어떤 정보를 담을지 정의
export class BasicException extends HttpException {
  code: number;

  //super로 부모가 가진 message, status 인자 값 할당, code에 값 할당
  constructor(message: string, status: number, code: ErrorCode) {
    super(message, status);
    this.code = code;
  }
}

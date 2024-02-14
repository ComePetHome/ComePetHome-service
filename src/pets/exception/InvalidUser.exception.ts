import { BasicException } from '@/exception/BasicException';
import { ErrorCode } from '@/exception/ErrorCode';
import { HttpStatus } from '@nestjs/common';

export class InvalidUserException extends BasicException {
  constructor() {
    super(
      '로그인한 사용자만 이용할 수 있는 기능입니다.',
      HttpStatus.BAD_REQUEST,
      ErrorCode.INVALID_USER_ID,
    );
  }
}

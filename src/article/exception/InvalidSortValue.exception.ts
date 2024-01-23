import { BasicException } from '@/exception/BasicException';
import { ErrorCode } from '@/exception/ErrorCode';
import { HttpStatus } from '@nestjs/common';

export class InvalidSortValueException extends BasicException {
  constructor() {
    super(
      '올바르지 않은 sort값입니다',
      HttpStatus.BAD_REQUEST,
      ErrorCode.INVALID_SORT_VALUE,
    );
  }
}

import { BasicException } from '@/exception/BasicException';
import { ErrorCode } from '@/exception/ErrorCode';
import { HttpStatus } from '@nestjs/common';

export class LikeAlreadyDeleteException extends BasicException {
  constructor() {
    super(
      '이미 좋아요가 삭제돼있습니다.',
      HttpStatus.BAD_REQUEST,
      ErrorCode.LIKE_ALREADY_DELETE,
    );
  }
}

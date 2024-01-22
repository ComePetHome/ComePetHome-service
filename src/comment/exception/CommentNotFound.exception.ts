import { BasicException } from '@/exception/BasicException';
import { ErrorCode } from '@/exception/ErrorCode';
import { HttpStatus } from '@nestjs/common';

export class CommentNotFoundException extends BasicException {
  constructor() {
    super(
      '존재하지 않는 댓글입니다.',
      HttpStatus.NOT_FOUND,
      ErrorCode.COMMENT_NOT_FOUND,
    );
  }
}

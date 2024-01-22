import { BasicException } from '@/exception/BasicException';
import { ErrorCode } from '@/exception/ErrorCode';
import { HttpStatus } from '@nestjs/common';

export class NotCommentAuthorException extends BasicException {
  constructor() {
    super(
      '댓글 작성자만 수정/삭제가 가능합니다.',
      HttpStatus.BAD_REQUEST,
      ErrorCode.NOT_COMMENT_AUTHOR,
    );
  }
}

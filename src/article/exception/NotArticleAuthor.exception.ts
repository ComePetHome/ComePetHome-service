import { BasicException } from '@/exception/BasicException';
import { ErrorCode } from '@/exception/ErrorCode';
import { HttpStatus } from '@nestjs/common';

export class NotArticleAuthorException extends BasicException {
  constructor() {
    super(
      '게시글 작성자만 수정/삭제가 가능합니다.',
      HttpStatus.BAD_REQUEST,
      ErrorCode.NOT_ARTICLE_AUTHOR,
    );
  }
}

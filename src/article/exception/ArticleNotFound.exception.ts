import { BasicException } from '@/exception/BasicException';
import { ErrorCode } from '@/exception/ErrorCode';
import { HttpStatus } from '@nestjs/common';

export class ArticleNotFoundException extends BasicException {
  constructor() {
    super(
      '존재하지 않는 게시물입니다.',
      HttpStatus.NOT_FOUND,
      ErrorCode.ARTICLE_NOT_FOUND,
    );
  }
}

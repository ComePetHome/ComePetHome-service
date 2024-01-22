import { BasicException } from '@/exception/BasicException';
import { ErrorCode } from '@/exception/ErrorCode';
import { HttpStatus } from '@nestjs/common';

export class FileUploadException extends BasicException {
  constructor() {
    super(
      '이미지 업로드 에러.',
      HttpStatus.BAD_REQUEST,
      ErrorCode.FILE_UPLOAD_EXCEPTION,
    );
  }
}

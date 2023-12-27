import { BasicException } from '@/exception/BasicException';
import { ErrorCode } from '@/exception/ErrorCode';
import { HttpStatus } from '@nestjs/common';

export class InvalidPetIdException extends BasicException {
  constructor() {
    super(
      '존재하지 않는 petId 입니다.',
      HttpStatus.NOT_FOUND,
      ErrorCode.INVALID_PET_ID,
    );
  }
}

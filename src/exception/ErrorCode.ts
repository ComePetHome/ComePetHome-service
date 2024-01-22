export enum ErrorCode {
  //Server error
  NEST_OFFER = 1,
  INTERNAL_SERVER_ERROR = 2,
  FILE_UPLOAD_EXCEPTION = 3,
  //Pet error
  INVALID_PET_ID = 1000 + 1,

  //Community error
  NOT_ARTICLE_AUTHOR = 2000 + 1,
  ARTICLE_NOT_FOUND = 2000 + 2,
  COMMENT_NOT_FOUND = 2000 + 3,
  NOT_COMMENT_AUTHOR = 2000 + 4,
}

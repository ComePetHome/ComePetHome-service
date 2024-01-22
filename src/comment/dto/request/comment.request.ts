import { ApiProperty } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

export class CommentRequest {
  @MaxLength(500, { message: '내용이 너무 깁니다( 500자 제한 )' })
  @ApiProperty({ description: '댓글 내용' })
  contents: string;

  @ApiProperty({ description: '게시물 id' })
  article_id: number;
}

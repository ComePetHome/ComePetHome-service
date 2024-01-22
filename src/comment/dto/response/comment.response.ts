import { ApiProperty } from '@nestjs/swagger';

export class CommentResponse {
  @ApiProperty({ description: '댓글 내용' })
  contents: string;

  @ApiProperty({ description: '게시물 id' })
  article_id: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CommentResponse {
  @Expose()
  @ApiProperty({ description: '댓글 내용' })
  contents: string;

  @Expose()
  @ApiProperty({ description: '게시물 id' })
  user_id: string;

  @Expose()
  @ApiProperty({ description: '작성일' })
  created_at: Date;

  @Expose()
  @ApiProperty({ description: '닉네임' })
  nickname: string;

  @Expose()
  @ApiProperty({ description: '프로필' })
  user_image: string;
}

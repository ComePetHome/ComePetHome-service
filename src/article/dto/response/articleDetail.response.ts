import { ArticleCategory } from '@/article/enum/articleCategory.enum';
import { CommentResponse } from '@/comment/dto/response/comment.response';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class ArticleDetailResponse {
  @Expose()
  @ApiProperty({
    description: '게시물 번호',
  })
  id: number;

  @Expose()
  @ApiProperty({
    description: '게시물 제목',
  })
  title: string;

  @Expose()
  @ApiProperty({ description: '게시물 내용' })
  contents: string;

  @Expose()
  @ApiProperty({ description: '게시물 카테고리', enum: ArticleCategory })
  category: ArticleCategory;

  @Expose()
  images: string[];

  @Expose()
  @ApiProperty({ description: '생성일' })
  created_at: Date;

  @Expose()
  @ApiProperty({ description: '좋아요 수' })
  like_num: number;

  @ApiProperty({ description: '댓글' })
  @Expose()
  @Type(() => CommentResponse)
  comments: CommentResponse[];

  @ApiProperty({ description: '내 좋아요 여부' })
  @Expose()
  like: boolean;

  @Expose()
  user_image: string;

  @Expose()
  nickname: string;
}

import { ArticleCategory } from '@/article/enum/articleCategory.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ArticleResponse {
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

  @ApiProperty({ description: '댓글 수' })
  @Expose()
  comment_num: number;
}

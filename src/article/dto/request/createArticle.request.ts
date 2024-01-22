import { ArticleCategory } from '@/article/enum/articleCategory.enum';
import { ApiProperty } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

export class CreateArticleRequest {
  @MaxLength(50, { message: '제목이 너무 깁니다( 50자 제한 )' })
  @ApiProperty({ description: '게시물 제목' })
  title: string;

  @MaxLength(1000, { message: '내용이 너무 깁니다( 1000자 제한 )' })
  @ApiProperty({ description: '게시물 내용' })
  contents: string;

  @ApiProperty({ description: '게시물 카테고리', enum: ArticleCategory })
  category: ArticleCategory;

  files: Express.Multer.File[];
}

import { ArticleCategory } from '@/article/enum/articleCategory.enum';
import { MaxLength } from 'class-validator';

export class CreateArticleDto {
  @MaxLength(50, { message: '제목이 너무 깁니다( 50자 제한 )' })
  title: string;
  @MaxLength(1000, { message: '내용이 너무 깁니다( 1000자 제한 )' })
  contents: string;
  category: ArticleCategory;
}

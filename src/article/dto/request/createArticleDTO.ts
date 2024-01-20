import { ArticleCategory } from '@/article/enum/articleCategory.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

export class CreateArticleDto {
  @MaxLength(50, { message: '제목이 너무 깁니다( 50자 제한 )' })
  @ApiProperty({ description: '게시물 제목' })
  title: string;

  @MaxLength(1000, { message: '내용이 너무 깁니다( 1000자 제한 )' })
  @ApiProperty({ description: '게시물 내용' })
  contents: string;

  @ApiProperty({ description: '게시물 카테고리', enum: ArticleCategory })
  category: ArticleCategory;

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    description: '첨부 파일 1',
  })
  file1: Express.Multer.File;

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    description: '첨부 파일 2',
  })
  file2: Express.Multer.File;

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    description: '첨부 파일 3',
  })
  file3: Express.Multer.File;
  files: Express.Multer.File[];
}

import { Controller, Get, Headers, Param, Query } from '@nestjs/common';
import {
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { ArticleCategory } from './enum/articleCategory.enum';
import { ArticleSort } from './enum/articleSort.enum';
import { ArticleResponse } from './dto/response/article.response';
import { ArticleDetailResponse } from './dto/response/articleDetail.response';

@Controller('read/community')
@ApiTags('커뮤니티')
export class ArticleReadController {
  constructor(private articleService: ArticleService) {}

  @Get()
  @ApiQuery({
    name: 'pageNumber',
    required: false,
    type: Number,
    description: '페이지 번호 (기본값: 0)',
  })
  @ApiQuery({
    name: 'category',
    required: true,
    type: 'string',
    enum: Object.values(ArticleCategory),
    description: '카테고리 ',
  })
  @ApiQuery({
    name: 'sort',
    required: true,
    type: 'string',
    enum: Object.values(ArticleSort),
    description: '정렬',
  })
  @ApiHeader({
    name: 'userId',
    description: 'User ID (Optional)',
    required: false,
  })
  @ApiOperation({ summary: '커뮤니티 리스트 조회' })
  async getArticles(
    @Query('sort') sort: ArticleSort,
    @Query('category') category: ArticleCategory,
    @Query('pageNumber') pageNum: number = 0,
    @Headers('userId') userId: string,
  ): Promise<ArticleResponse[]> {
    return this.articleService.getArticles(sort, category, pageNum, userId);
  }

  @Get('/info/:articleId')
  @ApiOperation({ summary: '게시글 자세한 정보 조회 (리스트에서 클릭했을 때)' })
  @ApiParam({
    name: 'articleId',
    type: Number,
    description: '게시물 id',
  })
  @ApiHeader({
    name: 'userId',
    description: 'User ID (Optional)',
    required: false,
  })
  async getArticle(
    @Headers('userId') userId: string,
    @Param('articleId') articleId: number,
  ): Promise<ArticleDetailResponse> {
    return this.articleService.getArticleDetail(articleId, userId);
  }

  @Get('/search')
  @ApiQuery({
    name: 'pageNumber',
    required: false,
    type: Number,
    description: '페이지 번호 (기본값: 0)',
  })
  @ApiHeader({
    name: 'userId',
    description: 'User ID (Optional)',
    required: false,
  })
  @ApiOperation({ summary: '커뮤니티 리스트 검색' })
  async getSearchedArticles(
    @Query('searchKeyword') word: string = '',
    @Query('pageNumber') pageNum: number = 0,
    @Headers('userId') userId: string,
  ): Promise<ArticleResponse[]> {
    return this.articleService.getSearchedArticles(pageNum, userId, word);
  }
}

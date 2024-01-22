import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ArticleCategory } from './enum/articleCategory.enum';
import { ArticleSort } from './enum/articleSort.enum';
import { ArticleResponse } from './dto/response/article.response';
import { CreateArticleRequest } from './dto/request/createArticle.request';
import { ArticleDetailResponse } from './dto/response/articleDetail.response';

@Controller('community')
@ApiTags('커뮤니티')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

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
  @ApiOperation({ summary: '커뮤니티 리스트 조회' })
  @Get()
  async getArticles(
    @Query('sort') sort: ArticleSort,
    @Query('category') category: ArticleCategory,
    @Query('pageNumber') pageNum: number = 0,
  ): Promise<ArticleResponse[]> {
    return this.articleService.getArticles(sort, category, pageNum);
  }

  @Get('/:articleId')
  @ApiOperation({ summary: '게시글 자세한 정보 조회 (리스트에서 클릭했을 때)' })
  @ApiParam({
    name: 'articleId',
    type: Number,
    description: '게시물 id',
  })
  async getArticle(
    @Param('articleId') articleId: number,
  ): Promise<ArticleDetailResponse> {
    return this.articleService.getArticleDetail(articleId);
  }

  @Post('/:userId')
  @ApiOperation({ summary: '게시글 작성' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files', 3))
  @ApiParam({
    name: 'userId',
    type: String,
    description: '사용자 id',
  })
  @ApiBody({
    //Todo: 인기순 정렬 추가 필요
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        contents: { type: 'string' },
        category: { type: 'string', enum: Object.values(ArticleCategory) },
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: '게시물 작성 성공' })
  async createArticle(
    @Param('userId') userId: string,
    @Body() createArticleRequest: CreateArticleRequest,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.articleService.createArticle(
      userId,
      createArticleRequest,
      files,
    );
  }

  @Delete('/:userId/:articleId')
  @ApiOperation({ summary: '게시글 삭제' })
  @ApiParam({
    name: 'userId',
    type: String,
    description: '사용자 id',
  })
  @ApiParam({
    name: 'articleId',
    type: Number,
    description: '게시물 id',
  })
  async deleteArticle(
    @Param('userId') userId: string,
    @Param('articleId') articleId: number,
  ) {
    return this.articleService.deleteArticle(userId, articleId);
  }
}

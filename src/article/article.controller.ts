import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/request/createArticleDTO';

@Controller('community')
@ApiTags('Community')
export class ArticleController {
  constructor(private articleSerivce: ArticleService) {}

  // @Get()
  // async getArticle(
  //   @Query('sort') sort: ArticleSort,
  //   @Query('category') category: ArticleCategory,
  //   @Query('pageNumber') pageNum: number = 0,
  // ) {
  //   return this.articleService.getArticles(sort, category, pageNum);
  // }

  @Post('/:userId')
  @ApiOperation({ summary: '게시글 작성' })
  @ApiParam({
    name: 'userId',
    type: String,
    description: '사용자 id',
  })
  async createArticle(
    @Param('userId') userId: string,
    @Body() createArticleDto: CreateArticleDto,
  ) {
    return this.articleSerivce.createArticle(userId, createArticleDto);
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
    return this.articleSerivce.deleteArticle(userId, articleId);
  }
}

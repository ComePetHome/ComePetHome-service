import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/request/createArticleDTO';

@Controller('community')
@ApiTags('Community')
export class ArticleController {
  constructor(private articleSerivce: ArticleService) {}

  @Post('/:userId')
  @ApiOperation({ summary: '게시글 작성' })
  async createArticle(
    @Param('userId') userId: string,
    @Body() createArticleDto: CreateArticleDto,
  ) {
    return this.articleSerivce.createArticle(userId, createArticleDto);
  }
}

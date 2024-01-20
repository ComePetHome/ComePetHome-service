import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/request/createArticleDTO';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ArticleCategory } from './enum/articleCategory.enum';

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
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files', 3))
  @ApiParam({
    name: 'userId',
    type: String,
    description: '사용자 id',
  })
  @ApiBody({
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
    @Body() createArticleDto: CreateArticleDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.articleSerivce.createArticle(userId, createArticleDto, files);
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

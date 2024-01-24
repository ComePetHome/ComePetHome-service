import {
  Body,
  Controller,
  Delete,
  Headers,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ArticleCategory } from './enum/articleCategory.enum';

import { CreateArticleRequest } from './dto/request/createArticle.request';

@Controller('command/community')
@ApiTags('커뮤니티')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Post()
  @ApiOperation({ summary: '게시글 작성' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files', 3))
  @ApiHeader({
    name: 'userId',
    description: 'User ID (Optional)',
    required: false,
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
    @Headers('userId') userId: string,
    @Body() createArticleRequest: CreateArticleRequest,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.articleService.createArticle(
      userId,
      createArticleRequest,
      files,
    );
  }

  @Delete('/:articleId')
  @ApiOperation({ summary: '게시글 삭제' })
  @ApiHeader({
    name: 'userId',
    description: 'User ID (Optional)',
    required: false,
  })
  @ApiParam({
    name: 'articleId',
    type: Number,
    description: '게시물 id',
  })
  async deleteArticle(
    @Headers('userId') userId: string,
    @Param('articleId') articleId: number,
  ) {
    return this.articleService.deleteArticle(userId, articleId);
  }
}

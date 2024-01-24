import { Controller, Delete, Headers, Param, Post } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ArticleLikeService } from './article-like.service';

@Controller('community/like')
@ApiTags('커뮤니티 좋아요')
export class ArticleLikeController {
  constructor(private articleLikeService: ArticleLikeService) {}

  @Post('/:articleId')
  @ApiHeader({
    name: 'userId',
    description: 'User ID (Optional)',
    required: false,
  })
  @ApiOperation({ summary: '게시물 좋아요 추가' })
  async addLike(
    @Headers('userId') userId: string,
    @Param('articleId') articleId: number,
  ) {
    return this.articleLikeService.addLike(userId, articleId);
  }

  @Delete('/:articleId')
  @ApiHeader({
    name: 'userId',
    description: 'User ID (Optional)',
    required: false,
  })
  @ApiOperation({ summary: '게시물 좋아요 삭제' })
  async deleteLike(
    @Headers('userId') userId: string,
    @Param('articleId') articleId: number,
  ) {
    return this.articleLikeService.removeLike(userId, articleId);
  }
}

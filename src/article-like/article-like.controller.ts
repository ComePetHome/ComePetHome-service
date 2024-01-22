import { Controller, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ArticleLikeService } from './article-like.service';

@Controller('community/like')
@ApiTags('커뮤니티 좋아요')
export class ArticleLikeController {
  constructor(private articleLikeService: ArticleLikeService) {}

  @Post('/:userId/:articleId')
  @ApiOperation({ summary: '게시물 좋아요 추가' })
  async addLike(
    @Param('userId') userId: string,
    @Param('articleId') articleId: number,
  ) {
    return this.articleLikeService.addLike(userId, articleId);
  }
}

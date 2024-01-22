import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { CommentRequest } from './dto/request/comment.request';

@Controller('community/comment')
@ApiTags('댓글')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post('/:UserId')
  @ApiParam({
    name: 'articleId',
    type: Number,
    description: '게시물 id',
  })
  @ApiBody({ type: CommentRequest })
  async addComment(
    @Param('userId') userId: string,
    @Body() commentRequest: CommentRequest,
  ) {
    return this.commentService.createComment(userId, commentRequest);
  }
}

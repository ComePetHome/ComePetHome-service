import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { CommentRequest } from './dto/request/comment.request';
import { CommentResponse } from './dto/response/comment.response';

@Controller('community/comment')
@ApiTags('댓글')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get('/:userId')
  @ApiOperation({ summary: '유저가 쓴 댓글 조회' })
  async getComment(
    @Param('userId') userId: string,
  ): Promise<CommentResponse[]> {
    return this.commentService.getComments(userId);
  }

  @Post('/:userId')
  @ApiOperation({ summary: '댓글 추가' })
  @ApiBody({ type: CommentRequest })
  async addComment(
    @Param('userId') userId: string,
    @Body() commentRequest: CommentRequest,
  ) {
    return this.commentService.createComment(userId, commentRequest);
  }

  @Delete('/:userId/:commentId')
  @ApiOperation({ summary: '댓글 삭제' })
  async deleteComment(
    @Param('userId') userId: string,
    @Param('commentId') commentId: number,
  ) {
    return this.commentService.deleteComment(userId, commentId);
  }
}

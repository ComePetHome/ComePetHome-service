import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { CommentRequest } from './dto/request/comment.request';
import { CommentResponse } from './dto/response/comment.response';

@Controller('community/comment')
@ApiTags('댓글')
@ApiBearerAuth('access-token')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get()
  @ApiHeader({
    name: 'userId',
    description: 'User ID (Optional)',
    required: false,
  })
  @ApiOperation({ summary: '유저가 쓴 댓글 조회' })
  async getComment(
    @Headers('userId') userId: string,
  ): Promise<CommentResponse[]> {
    return this.commentService.getComments(userId);
  }

  @Post()
  @ApiHeader({
    name: 'userId',
    description: 'User ID (Optional)',
    required: false,
  })
  @ApiOperation({ summary: '댓글 추가' })
  @ApiBody({ type: CommentRequest, description: '댓글 추가를 위한 요청 본문' })
  async addComment(
    @Headers('userId') userId: string,
    @Body() commentRequest: CommentRequest,
  ) {
    return this.commentService.createComment(userId, commentRequest);
  }

  @Delete('/:commentId')
  @ApiHeader({
    name: 'userId',
    description: 'User ID (Optional)',
    required: false,
  })
  @ApiOperation({ summary: '댓글 삭제' })
  async deleteComment(
    @Headers('userId') userId: string,
    @Param('commentId') commentId: number,
  ) {
    return this.commentService.deleteComment(userId, commentId);
  }
}

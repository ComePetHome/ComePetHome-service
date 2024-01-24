import { Controller, Get, Headers } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';

import { CommentResponse } from './dto/response/comment.response';

@Controller('read/community/comment')
@ApiTags('댓글')
export class CommentReadController {
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
}

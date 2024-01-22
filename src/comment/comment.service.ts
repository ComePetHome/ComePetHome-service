import { Injectable } from '@nestjs/common';
import { CommentRequest } from './dto/request/comment.request';

import { CommentRepository } from './comment.repository';
import { ArticleValidService } from '@/article/articleValid.service';
import { Comment } from './comment.entity';
import { CommentNotFoundException } from './exception/CommentNotFound.exception';
import { NotCommentAuthorException } from './exception/NotCommentAuthor.exception';
import { CommentResponse } from './dto/response/comment.response';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CommentService {
  constructor(
    private commentRepository: CommentRepository,
    private articleValidService: ArticleValidService,
  ) {}

  //유저가 단 댓글 조회
  async getComments(userId: string): Promise<CommentResponse[]> {
    const comments: CommentResponse[] = (
      await this.commentRepository.find({
        where: { user_id: userId },
      })
    ).map((comment) =>
      plainToClass(CommentResponse, comment, {
        excludeExtraneousValues: true,
      }),
    );
    return comments;
  }

  // article에 comment 하나 달기
  async createComment(
    user_id: string,
    request: CommentRequest,
  ): Promise<Comment> {
    const { contents, article_id } = request;
    const article = await this.articleValidService.getArticleById(article_id);
    const comment = await this.commentRepository.create({
      article: article,
      user_id: user_id,
      contents: contents,
    });

    return await this.commentRepository.save(comment);
  }
  // id 같은 comment 하나 삭제
  async deleteComment(userId: string, comment_id: number): Promise<void> {
    const comment: Comment = await this.findCommentById(comment_id);
    if (comment.user_id != userId) {
      throw new NotCommentAuthorException();
    } else {
      await this.commentRepository.remove(comment);
    }
  }

  async findCommentById(comment_id: number): Promise<Comment> {
    try {
      const comment: Comment = await this.commentRepository.findOneOrFail({
        where: { id: comment_id },
      });
      return comment;
    } catch {
      throw new CommentNotFoundException();
    }
  }
}

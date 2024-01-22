import { Injectable } from '@nestjs/common';
import { CommentRequest } from './dto/request/comment.request';

import { CommentRepository } from './comment.repository';
import { ArticleValidService } from '@/article/articleValid.service';
import { Comment } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(
    private commentRepository: CommentRepository,
    private articleValidService: ArticleValidService,
  ) {}
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

  async deleteComment() {}
}

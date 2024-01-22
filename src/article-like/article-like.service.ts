import { ArticleValidService } from '@/article/articleValid.service';
import { Injectable } from '@nestjs/common';
import { ArticleLikeRepository } from './article-like.repository';
import { ArticleLike } from './article-like.entity';
import { LikeAlreadyExistsException } from './exception/LikeAlreadyExists.exception';
import { Article } from '@/article/article.entity';

@Injectable()
export class ArticleLikeService {
  constructor(
    private readonly articleLikeRepository: ArticleLikeRepository,
    private readonly articleValidService: ArticleValidService,
  ) {}

  async addLike(user_id: string, article_id: number): Promise<ArticleLike> {
    const article: Article =
      await this.articleValidService.getArticleById(article_id);

    const like = await this.articleLikeRepository.findOne({
      where: { user_id, article: { id: article_id } },
    });

    if (like) {
      //이미 좋아요 존재
      throw new LikeAlreadyExistsException();
    } else {
      const articleLike: ArticleLike = this.articleLikeRepository.create({
        user_id: user_id,
        article: article,
      });

      return await this.articleLikeRepository.save(articleLike);
    }
  }

  async removeLike(user_id: string, article_id: number): Promise<void> {
    const articleLike = await this.articleLikeRepository.findOne({
      where: { user_id, article: { id: article_id } },
    });
    if (!articleLike) {
      //Todo: 없다면 무시 처리 (다른 처리 가능)
      return;
    }
    await this.articleLikeRepository.remove(articleLike);
  }
}

import { Injectable } from '@nestjs/common';
import { ArticleRepository } from './article.repository';
import { Article } from './article.entity';
import { ArticleNotFoundException } from './exception/ArticleNotFoundException';

@Injectable()
export class ArticleValidService {
  constructor(private articleRepository: ArticleRepository) {}

  async getArticleById(article_id: number): Promise<Article> {
    const article = await this.articleRepository.findOne({
      where: { id: article_id },
    });
    if (!article) {
      throw new ArticleNotFoundException();
    }
    return article;
  }
}

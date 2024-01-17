import { Injectable } from '@nestjs/common';
import { ArticleRepository } from './article.repository';
import { CreateArticleDto } from './dto/request/createArticleDTO';
import { Article } from './article.entity';

@Injectable()
export class ArticleService {
  constructor(private articleRepository: ArticleRepository) {}

  async createArticle(
    userId: string,
    articleDto: CreateArticleDto,
  ): Promise<Article> {
    const { title, contents, category } = articleDto;
    const article = this.articleRepository.create({
      user_id: userId,
      title: title,
      contents: contents,
      category: category,
    });

    return await this.articleRepository.save(article);
  }
}

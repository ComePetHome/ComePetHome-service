import { Injectable } from '@nestjs/common';
import { ArticleRepository } from './article.repository';
import { CreateArticleDto } from './dto/request/createArticleDTO';
import { Article } from './article.entity';
import { NotArticleAuthorException } from './exception/NotArticleAuthorException';

@Injectable()
export class ArticleService {
  constructor(private articleRepository: ArticleRepository) {}

  // async getArticles(
  //   sort: ArticleSort,
  //   category: ArticleCategor,
  //   pageNum: number,
  // ){

  // }

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

  async deleteArticle(userId: string, articleId: number): Promise<void> {
    const article = await this.articleRepository.findOneById(articleId);
    if (article.user_id === userId) {
      await this.articleRepository.remove(article);
    } else {
      throw NotArticleAuthorException;
    }
  }
}

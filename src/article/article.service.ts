import { Injectable } from '@nestjs/common';
import { ArticleRepository } from './article.repository';
import { CreateArticleRequest } from './dto/request/createArticle.request';
import { Article } from './article.entity';
import { NotArticleAuthorException } from './exception/NotArticleAuthor.exception';
import { ImageuploadService } from '@/imageupload/imageupload.service';
import { ArticleCategory } from './enum/articleCategory.enum';
import { ArticleSort } from './enum/articleSort.enum';
import { ArticleResponse } from './dto/response/article.response';
import { plainToClass } from 'class-transformer';
import { ArticleDetailResponse } from './dto/response/articleDetail.response';
import { ArticleValidService } from './articleValid.service';
import { ArticleNotFoundException } from './exception/ArticleNotFound.exception';

@Injectable()
export class ArticleService {
  constructor(
    private articleRepository: ArticleRepository,
    private imageUploadService: ImageuploadService,
    private articleValidService: ArticleValidService,
  ) {}

  async getArticles(
    sort: ArticleSort,
    category: ArticleCategory,
    pageNum: number,
    pageSize: number = 10,
  ): Promise<ArticleResponse[]> {
    const skip = pageNum * pageSize;
    const articles: ArticleResponse[] = (
      await this.articleRepository
        .createQueryBuilder('article')
        .where('article.category = :category', { category })
        .leftJoinAndSelect('article.comments', 'comment')
        .orderBy('article.created_at', 'DESC')
        .skip(skip)
        .take(pageSize)
        .getMany()
    ).map((article) =>
      plainToClass(
        ArticleResponse,
        { ...article, comment_num: article.comments.length },
        { excludeExtraneousValues: true },
      ),
    );

    return articles;
  }

  async getArticleDetail(articleId: number): Promise<ArticleDetailResponse> {
    const article: Article = await this.articleRepository
      .createQueryBuilder('article')
      .where('article.id = :articleId', { articleId })
      .leftJoinAndSelect('article.comments', 'comment')
      .orderBy('comment.created_at', 'DESC')
      .getOne();

    if (!article) {
      throw new ArticleNotFoundException();
    }

    return plainToClass(ArticleDetailResponse, article, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });
  }

  async createArticle(
    userId: string,
    articleDto: CreateArticleRequest,
    files: Array<Express.Multer.File>,
  ): Promise<Article> {
    const { title, contents, category } = articleDto;
    const images: string[] = await this.uploadImage(files);

    const article = this.articleRepository.create({
      user_id: userId,
      title: title,
      contents: contents,
      category: category,
      images: images,
    });
    return await this.articleRepository.save(article);
  }

  async deleteArticle(userId: string, articleId: number): Promise<void> {
    const article = await this.articleRepository.findOneById(articleId);
    if (article.user_id === userId) {
      await this.deleteImage(article.images);
      await this.articleRepository.remove(article);
    } else {
      throw NotArticleAuthorException;
    }
  }

  async deleteImage(files: string[]) {
    files.map(async (file: string) => {
      await this.imageUploadService.fileDelete(file);
    });
  }

  async uploadImage(files: Express.Multer.File[]) {
    const imgurl: string[] = [];

    await Promise.all(
      files.map(async (file: Express.Multer.File) => {
        const key = await this.imageUploadService.fileUpload(file);
        if (key != null) {
          imgurl.push(key);
        }
      }),
    );
    return imgurl;
  }
}

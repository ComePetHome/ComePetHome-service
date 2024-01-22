import { Injectable } from '@nestjs/common';
import { ArticleRepository } from './article.repository';
import { CreateArticleRequest } from './dto/request/createArticle.request';
import { Article } from './article.entity';
import { NotArticleAuthorException } from './exception/NotArticleAuthorException';
import { ImageuploadService } from '@/imageupload/imageupload.service';
import { ArticleCategory } from './enum/articleCategory.enum';
import { ArticleSort } from './enum/articleSort.enum';
import { ArticleResponse } from './dto/response/article.response';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ArticleService {
  constructor(
    private articleRepository: ArticleRepository,
    private imageUploadService: ImageuploadService,
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

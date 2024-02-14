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
import { ArticleNotFoundException } from './exception/ArticleNotFound.exception';
import { InvalidSortValueException } from './exception/InvalidSortValue.exception';
import { getUserImageAPI } from '@/apis/profileImageAPIS';
import { Connection } from 'typeorm';
import { InvalidUserException } from '@/pets/exception/InvalidUser.exception';

@Injectable()
export class ArticleService {
  constructor(
    private readonly connection: Connection,
    private articleRepository: ArticleRepository,
    private imageUploadService: ImageuploadService,
  ) {}

  // 게시물 리스트 반환
  async getArticles(
    sort: ArticleSort,
    category: ArticleCategory,
    pageNum: number,
    user_id: string,
    pageSize: number = 10,
  ): Promise<ArticleResponse[]> {
    const skip = pageNum * pageSize;
    let articles: Article[];

    const queryBuilder = this.articleRepository
      .createQueryBuilder('article')
      .where('article.category = :category', { category })
      .leftJoinAndSelect('article.comments', 'comment')
      .leftJoinAndSelect('article.likes', 'like', 'like.user_id = :user_id', {
        user_id: user_id,
      })
      .skip(skip)
      .take(pageSize);

    if (sort === ArticleSort.LATEST) {
      articles = await queryBuilder
        .orderBy('article.created_at', 'DESC')
        .getMany();
    } else if (sort === ArticleSort.POPULAR) {
      articles = await queryBuilder
        .orderBy('article.like_num', 'DESC')
        .getMany();
    } else {
      throw new InvalidSortValueException();
    }

    return Promise.all(
      articles.map(async (article) => {
        const user_image = await getUserImageAPI(article.user_id);
        const nickname = await this.connection.query(
          `SELECT nick_name FROM users WHERE user_id = '${article.user_id}'`,
        );

        return plainToClass(
          ArticleResponse,
          {
            ...article,
            like: article.likes.length > 0,
            comment_num: article.comments.length,
            user_image: user_image,
            nickname: nickname[0].nick_name,
          },
          { excludeExtraneousValues: true },
        );
      }),
    );
  }
  // 게시물 검색
  async getSearchedArticles(
    pageNum: number,
    user_id: string,
    searchKeyword: string,
  ): Promise<ArticleResponse[]> {
    const pageSize = 10;
    const skip = pageNum * pageSize;

    const articles: Article[] = await this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.comments', 'comment')
      .leftJoinAndSelect('article.likes', 'like', 'like.user_id = :user_id', {
        user_id: user_id,
      })
      .where(
        'article.title LIKE :searchKeyword OR article.contents LIKE :searchKeyword',
        {
          searchKeyword: `%${searchKeyword}%`,
        },
      )
      .skip(skip)
      .take(pageSize)
      .orderBy('article.created_at', 'DESC')
      .getMany();
    return Promise.all(
      articles.map(async (article) => {
        const user_image = await getUserImageAPI(article.user_id);
        const nickname = await this.connection.query(
          `SELECT nick_name FROM users WHERE user_id = '${article.user_id}'`,
        );
        return plainToClass(
          ArticleResponse,
          {
            ...article,
            like: article.likes.length > 0,
            comment_num: article.comments.length,
            user_image: user_image,
            nickname: nickname[0].nick_name,
          },
          { excludeExtraneousValues: true },
        );
      }),
    );
  }

  // 내가 쓴 글
  async getArticlesByUserId(
    pageNum: number,
    user_id: string,
  ): Promise<ArticleResponse[]> {
    if (user_id == undefined) {
      throw new InvalidUserException();
    }
    const pageSize = 10;
    const skip = pageNum * pageSize;

    const articles: Article[] = await this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.comments', 'comment')
      .leftJoinAndSelect('article.likes', 'like', 'like.user_id = :user_id', {
        user_id: user_id,
      })
      .where('article.user_id = :user_id', {
        user_id: user_id,
      })
      .skip(skip)
      .take(pageSize)
      .orderBy('article.created_at', 'DESC')
      .getMany();

    return articles.map((article) =>
      plainToClass(
        ArticleResponse,
        {
          ...article,
          like: article.likes.length > 0,
          comment_num: article.comments.length,
        },
        { excludeExtraneousValues: true },
      ),
    );
  }

  //세부정보 확인 (클릭 시)
  async getArticleDetail(
    articleId: number,
    user_id: string,
  ): Promise<ArticleDetailResponse> {
    const article: Article = await this.articleRepository
      .createQueryBuilder('article')
      .where('article.id = :articleId', { articleId })
      .leftJoinAndSelect('article.likes', 'like', 'like.user_id = :user_id', {
        user_id: user_id,
      })
      .leftJoinAndSelect('article.comments', 'comment')
      .orderBy('comment.created_at', 'DESC')
      .getOne();

    if (!article) {
      throw new ArticleNotFoundException();
    }

    const enrichedComments = await Promise.all(
      article.comments.map(async (comment) => {
        // 각 댓글에 대한 추가 정보 로드
        const user_image = await getUserImageAPI(comment.user_id);
        const nicknameResult = await this.connection.query(
          `SELECT nick_name FROM users WHERE user_id = '${comment.user_id}'`,
        );
        const nickname = nicknameResult[0]?.nick_name || '';

        return {
          ...comment,
          user_image,
          nickname,
        };
      }),
    );
    const enrichedArticle = {
      ...article,
      comments: enrichedComments,
    };

    const user_image = await getUserImageAPI(article.user_id);
    const nickname = await this.connection.query(
      `SELECT nick_name FROM users WHERE user_id = '${article.user_id}'`,
    );

    return plainToClass(
      ArticleDetailResponse,
      {
        ...enrichedArticle,
        like: article.likes.length > 0,
        user_image: user_image,
        nickname: nickname[0].nick_name,
      },
      {
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
      },
    );
  }

  // 게시물 생성
  async createArticle(
    userId: string,
    articleDto: CreateArticleRequest,
    files: Array<Express.Multer.File>,
  ): Promise<Article> {
    if (userId == undefined) {
      throw new InvalidUserException();
    }
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

  // 게시물 삭제
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

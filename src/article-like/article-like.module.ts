import { Module } from '@nestjs/common';
import { ArticleLikeController } from './article-like.controller';
import { ArticleLikeService } from './article-like.service';
import { ArticleModule } from '@/article/article.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleLike } from './article-like.entity';
import { ArticleLikeRepository } from './article-like.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleLike]), ArticleModule],
  controllers: [ArticleLikeController],
  providers: [ArticleLikeService, ArticleLikeRepository],
})
export class ArticleLikeModule {}

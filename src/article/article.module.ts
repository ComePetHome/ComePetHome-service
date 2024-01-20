import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { ArticleRepository } from './article.repository';
import { ImageuploadModule } from '@/imageupload/imageupload.module';

@Module({
  imports: [TypeOrmModule.forFeature([Article]), ImageuploadModule],
  controllers: [ArticleController],
  providers: [ArticleService, ArticleRepository],
})
export class ArticleModule {}

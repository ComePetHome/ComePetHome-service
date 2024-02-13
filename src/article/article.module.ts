import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { ArticleRepository } from './article.repository';
import { ImageuploadModule } from '@/imageupload/imageupload.module';
import { ArticleValidService } from './articleValid.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article]),
    ImageuploadModule,
    // UsersModule,
  ],
  controllers: [ArticleController],
  providers: [ArticleService, ArticleRepository, ArticleValidService],
  exports: [ArticleRepository, ArticleValidService],
})
export class ArticleModule {}

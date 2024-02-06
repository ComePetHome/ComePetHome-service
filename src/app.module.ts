import { Module } from '@nestjs/common';
import { PetsModule } from './pets/pets.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { PetLikeModule } from './pet-like/pet-like.module';
import { ArticleModule } from './article/article.module';
import { ImageuploadModule } from './imageupload/imageupload.module';
import { CommentModule } from './comment/comment.module';
import { ArticleLikeModule } from './article-like/article-like.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PetsModule,
    TypeOrmModule.forRoot(typeORMConfig),
    PetLikeModule,
    ArticleModule,
    ImageuploadModule,
    CommentModule,
    ArticleLikeModule,
    RouterModule.register([
      {
        path: 'pet',
        module: PetsModule,
      },
      {
        path: 'pet',
        module: PetLikeModule,
      },
      {
        path: 'pet',
        module: ArticleModule,
      },
      {
        path: 'pet',
        module: ArticleLikeModule,
      },
      {
        path: 'pet',
        module: CommentModule,
      },
    ]),
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { ArticleModule } from '@/article/article.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentRepository } from './comment.repository';
import { Comment } from './comment.entity';
import { CommentReadController } from './comment.controller-read';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), ArticleModule],
  providers: [CommentService, CommentRepository],
  controllers: [CommentController, CommentReadController],
})
export class CommentModule {}

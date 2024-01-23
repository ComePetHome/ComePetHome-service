import { DataSource, EntityRepository, Repository } from 'typeorm';
import { ArticleLike } from './article-like.entity';
import { InjectRepository } from '@nestjs/typeorm';

@EntityRepository(ArticleLike)
export class ArticleLikeRepository extends Repository<ArticleLike> {
  constructor(
    @InjectRepository(ArticleLike)
    private dataSource: DataSource,
  ) {
    super(ArticleLike, dataSource.manager);
  }
}

import { DataSource, EntityRepository, Repository } from 'typeorm';
import { Article } from './article.entity';
import { InjectRepository } from '@nestjs/typeorm';

@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {
  constructor(
    @InjectRepository(Article)
    private dataSource: DataSource,
  ) {
    super(Article, dataSource.manager);
  }
}

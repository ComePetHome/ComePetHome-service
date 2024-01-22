import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityRepository, Repository } from 'typeorm';
import { Comment } from './comment.entity';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  constructor(
    @InjectRepository(Comment)
    private dataSource: DataSource,
  ) {
    super(Comment, dataSource.manager);
  }
}

import { DataSource, EntityRepository, Repository } from 'typeorm';
import { PetLike } from './pet-like.entity';
import { InjectRepository } from '@nestjs/typeorm';

@EntityRepository(PetLike)
export class PetLikeRepository extends Repository<PetLike> {
  constructor(
    @InjectRepository(PetLike)
    private dataSource: DataSource,
  ) {
    super(PetLike, dataSource.manager);
  }
}

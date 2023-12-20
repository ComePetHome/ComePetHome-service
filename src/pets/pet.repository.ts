import { DataSource, EntityRepository, Repository } from 'typeorm';
import { Pet } from './pet.entity';
import { InjectRepository } from '@nestjs/typeorm';

@EntityRepository(Pet)
export class PetRepository extends Repository<Pet> {
  constructor(
    @InjectRepository(Pet)
    private dataSource: DataSource,
  ) {
    super(Pet, dataSource.manager);
  }
}

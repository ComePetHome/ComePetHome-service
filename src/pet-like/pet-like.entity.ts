import { BasicEntity } from '@/common/audit/Basic.entity';
import { Pet } from '@/pets/pet.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class PetLike extends BasicEntity {
  @Column({ nullable: false })
  user_id: number;

  @ManyToOne(() => Pet, (pet) => pet.likes)
  pet: Pet;
}

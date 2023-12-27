import { BasicEntity } from '@/common/audit/Basic.entity';
import { Entity } from 'typeorm';

@Entity()
export class PetLike extends BasicEntity {
  id: number;
  created_at: Date;
}

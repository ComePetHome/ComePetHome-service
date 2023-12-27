import { BasicEntity } from '@/common/audit/Basic.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Pet extends BasicEntity {
  @Column({ nullable: false })
  pet_id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  center: string;

  @Column({ nullable: false })
  enlistment_date: Date;

  @Column({ nullable: false })
  species: string;

  @Column({ nullable: false })
  breeds: string;

  @Column({ nullable: false })
  sex: string;

  @Column({ nullable: false })
  age: string;

  @Column({ type: 'double precision', nullable: false })
  weight: number;

  @Column({ nullable: false })
  adp_status: string;

  @Column({ nullable: false })
  temporary_protection_status: string;

  @Column()
  intro_url: string;

  @Column()
  intro_contents: string;

  @Column({ nullable: true })
  temporary_protection_contents: string;

  @Column({ nullable: true })
  thumbnail_url: string;
}

import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Pet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

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

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}

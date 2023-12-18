import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  animal_id: number;

  @Column()
  name: string;

  @Column()
  enlistment_date: Date;

  @Column({ nullable: false })
  species: string;
  @Column()
  breeds: string;
  @Column()
  age: string;
  @Column()
  weight: number;
  @Column()
  adp_status: string;
  @Column()
  temporary_protection_status: string;
  @Column()
  intro_url: string;
  @Column()
  intro_contents: string;
  @Column()
  temporary_protection_contents: string;
  @Column()
  thumbnail_url: string;
  @Column()
  created_at: Date;
  @Column()
  updated_at: Date;
}

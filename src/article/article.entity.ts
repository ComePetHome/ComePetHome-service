import { BasicEntity } from '@/common/audit/Basic.entity';
import { Column, Entity } from 'typeorm';
import { ArticleCategory } from './articleCategory.enum';

@Entity()
export class Article extends BasicEntity {
  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  contents: string;

  @Column({
    nullable: false,
    type: 'enum',
    enum: ArticleCategory,
  })
  category: ArticleCategory;

  @Column({ nullable: false })
  user_id: string;
}

import { Article } from '@/article/article.entity';
import { BasicEntity } from '@/common/audit/Basic.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class ArticleLike extends BasicEntity {
  @Column({ nullable: false })
  user_id: string;

  @ManyToOne(() => Article, (article) => article.likes)
  article: Article;
}

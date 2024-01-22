import { Article } from '@/article/article.entity';
import { BasicEntity } from '@/common/audit/Basic.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Comment extends BasicEntity {
  @Column({ nullable: false })
  contents: string;

  @Column({ nullable: false })
  user_id: string;

  @ManyToOne(() => Article, (article) => article.comments)
  article: Article;
}

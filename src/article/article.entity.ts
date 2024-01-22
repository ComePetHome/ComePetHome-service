import { BasicEntity } from '@/common/audit/Basic.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { ArticleCategory } from './enum/articleCategory.enum';
import { Comment } from '@/comment/comment.entity';
import { ArticleLike } from '@/article-like/article-like.entity';

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

  @Column({ type: 'text', array: true, nullable: true })
  images: string[];

  @OneToMany(() => Comment, (comment) => comment.article, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  comments: Comment[];

  @OneToMany(() => ArticleLike, (like) => like.article, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  likes: ArticleLike[];
}

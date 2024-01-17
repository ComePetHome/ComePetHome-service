import { BasicEntity } from '@/common/audit/Basic.entity';
import { Entity } from 'typeorm';

@Entity()
export class Article extends BasicEntity {}

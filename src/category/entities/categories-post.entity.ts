import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  AfterLoad,
  AfterInsert,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { EntityHelper } from 'src/utils/entity-helper';
import { PostEntity } from 'src/post/post.entity';
import { CategoriesEntity } from './category.entity';

@Entity({ name: 'categories_post' })
export class CategoriesPostEntity extends EntityHelper {
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'category_id', type: 'uuid' })
  caegoryId: string;

  @Column({ name: 'post_id', type: 'uuid' })
  postId: string;

  @JoinColumn({ name: 'post_id' })
  @ManyToOne(() => PostEntity, (Post) => Post.categoriesPost)
  post: PostEntity;

  @JoinColumn({ name: 'category_id' })
  @ManyToOne(() => CategoriesEntity, (category) => category.categoriesPost)
  category: CategoriesEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

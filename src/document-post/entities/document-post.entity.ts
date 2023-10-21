import { CategoryPost } from 'src/category-post/entities/category-post.entity';
import { FileEntity } from 'src/files/entities/file.entity';
import { ReviewPost } from 'src/review-post/entities/review-post.entity';
import { User } from 'src/users/entities/user.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'document-post' })
export class DocumentPost extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @ManyToMany(() => CategoryPost, (category) => category.post, {
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinTable()
  category: CategoryPost[];

  @OneToMany(() => ReviewPost, (review) => review.post)
  reviews: ReviewPost[];

  @ManyToOne(() => FileEntity, {
    eager: true,
    onDelete: 'CASCADE',
  })
  thumbnail: FileEntity | null;

  @ManyToOne(() => FileEntity, {
    eager: true,
    onDelete: 'CASCADE',
  })
  file: FileEntity | null;

  @Column({ type: 'number', nullable: false })
  authorID: number;

  @ManyToOne(() => User, {
    eager: true,
  })
  @JoinColumn({ name: 'authorID' })
  author: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

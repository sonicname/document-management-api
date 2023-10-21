import { DocumentPost } from 'src/document-post/entities/document-post.entity';
import { User } from 'src/users/entities/user.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'review-post' })
export class ReviewPost extends EntityHelper {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'int', nullable: false, default: 0 })
  rating: number;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ nullable: false, name: 'postID' })
  postID: string;

  @ManyToOne(() => DocumentPost, (post) => post.reviews)
  @JoinColumn({ name: 'postID' })
  post: DocumentPost;

  @Column({ type: 'number', nullable: false })
  reviewerID: number;

  @ManyToOne(() => User, {
    eager: true,
  })
  @JoinColumn({ name: 'reviewerID' })
  reviewer: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

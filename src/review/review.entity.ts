import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { PostEntity } from 'src/post/post.entity';
import { User } from 'src/users/entities/user.entity';

@Entity({ name: 'review' })
export class ReviewEntity extends EntityHelper {
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', type: 'integer' })
  userId: number;

  @Column({ name: 'post_id', type: 'uuid' })
  postId: string;

  @Column({ name: 'rating', type: 'integer' })
  rating: number;

  @Column({ name: 'description', type: 'varchar' })
  description: string;

  @JoinColumn({ name: 'post_id' })
  @ManyToOne(() => PostEntity, (Post) => Post.review)
  post: PostEntity;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, (user) => user.review)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

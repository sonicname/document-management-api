import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { FileEntity } from 'src/files/entities/file.entity';
import { ReviewEntity } from 'src/review/review.entity';
import { CategoriesPostEntity } from 'src/category/entities/categories-post.entity';

@Entity({ name: 'post' })
export class PostEntity extends EntityHelper {
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'thumbnail_id', type: 'uuid', nullable: true })
  thumbnailId: string;

  @Column({ name: 'title', type: 'varchar' })
  title: string;

  @Column({ name: 'description', type: 'varchar' })
  description: string;

  @Column({ name: 'total_review', type: 'integer', default: 0 })
  totalReview: number;

  @OneToMany(() => ReviewEntity, (Review) => Review.post)
  review: ReviewEntity;

  @OneToMany(() => FileEntity, (File) => File.post)
  file: FileEntity;

  @OneToMany(
    () => CategoriesPostEntity,
    (CategoriesPost) => CategoriesPost.post,
  )
  categoriesPost: CategoriesPostEntity;

  @JoinColumn({ name: 'thumbnail_id' })
  @OneToOne(() => FileEntity, (File) => File.thumbnail)
  thumbnail: FileEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

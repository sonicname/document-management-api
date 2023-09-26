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
import { Allow } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import appConfig from '../../config/app.config';
import { AppConfig } from 'src/config/config.type';
import { User } from 'src/users/entities/user.entity';
import { PostEntity } from 'src/post/post.entity';

@Entity({ name: 'file' })
export class FileEntity extends EntityHelper {
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Allow()
  @Column()
  path: string;

  @Column({ name: 'uploader_id', type: 'integer' })
  uploaderId: number;

  @Column({ name: 'post_id', type: 'uuid', nullable: true })
  postId: number;

  @JoinColumn({ name: 'uploader_id' })
  @ManyToOne(() => User, (uploader) => uploader.file)
  uploader: User;

  @JoinColumn({ name: 'post_id' })
  @ManyToOne(() => User, (post) => post.file)
  post: PostEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @AfterLoad()
  @AfterInsert()
  updatePath() {
    if (this.path.indexOf('/') === 0) {
      this.path = (appConfig() as AppConfig).backendDomain + this.path;
    }
  }
}

import { Injectable } from '@nestjs/common';
import { Repository, IsNull } from 'typeorm';
import { PostEntity } from './post.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions } from 'src/utils/types/pagination-options';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async createPost(createPostDto: CreatePostDto): Promise<void> {
    await this.postRepository.save(
      await this.postRepository.create(createPostDto),
    );
  }
  async getPostWithPagination(
    paginationOptions: IPaginationOptions,
  ): Promise<PostEntity[]> {
    return this.postRepository.find({
      where: { deletedAt: IsNull() },
      take: paginationOptions.limit,
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
    });
  }

  async getOneById(id: PostEntity['id']): Promise<PostEntity> {
    const post = await this.postRepository.query(
      `select * from post where id = '${id}' limit 1`,
    );
    return post;
  }

  async update(
    id: PostEntity['id'],
    updatePostDto: UpdatePostDto,
  ): Promise<PostEntity> {
    await this.postRepository.update(id, updatePostDto);
    const updatedPost = await this.getOneById(id);
    return updatedPost;
  }

  async softDelete(id: PostEntity['id']): Promise<void> {
    await this.postRepository.softDelete(id);
  }
}

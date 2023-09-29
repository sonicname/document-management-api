import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { IsNull, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './post.entity';

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
  async getPostWithPagination(paginationOptions: IPaginationOptions) {
    return paginate(
      this.postRepository,
      {
        limit: paginationOptions.limit,
        page: paginationOptions.page,
      },
      {
        where: { deletedAt: IsNull() },
      },
    );
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

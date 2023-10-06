import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './post.entity';
import { CategoryService } from 'src/category/category.service';
import { ReviewEntity } from 'src/review/review.entity';
import { CategoriesPostDto } from 'src/category/dto/update-categories.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    private readonly categoryServicce: CategoryService,
  ) {}

  async createPost(createPostDto: CreatePostDto): Promise<void> {
    const newPost = await this.postRepository.save(
      await this.postRepository.create(createPostDto),
    );
    await this.categoryServicce.createCategoryPost({
      categoryIds: createPostDto.categoryIds,
      postId: newPost.id,
    });
  }

  async getAllPostWithPagination(paginationOptions: IPaginationOptions) {
    const posts = this.postRepository.query(`
        SELECT
            p.title,
            p.description,
            p."total_review",
            p."createdAt",
            p."updatedAt",
            f.path AS thumbnail_path,
            ARRAY_AGG(f2.path) AS file_path
        FROM
            post AS p
        INNER JOIN
            file AS f
        ON
            f.id = p.thumbnail_id
        INNER JOIN
            file AS f2
        ON
            p.id = f2.post_id
        GROUP BY
            p.title,
            p.description,
            p."total_review",
            p."createdAt",
            p."updatedAt",
            f.path
        ORDER BY
            p."createdAt" DESC
        LIMIT ${paginationOptions.limit}
        OFFSET ${(paginationOptions.page - 1) * paginationOptions.limit};
    `);
    return posts;
  }

  async findPostByCategoryId(
    categoryId: CategoriesPostDto['caegoryId'],
    paginationOptions: IPaginationOptions,
  ) {
    const posts = this.postRepository.query(`
       select * from post
        inner join categories_post cp on post.id = cp.post_id
        where cp.category_id = '${categoryId}'
        LIMIT ${paginationOptions.limit}
        OFFSET ${(paginationOptions.page - 1) * paginationOptions.limit};
    `);
    return posts;
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
  async updateTotalReview(
    id: PostEntity['id'],
    rating: ReviewEntity['rating'],
  ): Promise<void> {
    await this.postRepository.query(`
      update post 
      set total_review = total_review + ${rating}
      where id = '${id}'
    `);
  }
}

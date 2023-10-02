import { CategoriesEntity } from './entities/category.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Repository } from 'typeorm';
import { CategoriesPostEntity } from './entities/categories-post.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateCategoryPostDto } from './dto/create-categories-post.dto';
import { PostEntity } from 'src/post/post.entity';
import { FindPostDto } from './dto/find-post.dto';
@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoriesEntity)
    private readonly categoryRepository: Repository<CategoriesEntity>,
    @InjectRepository(CategoriesPostEntity)
    private readonly categoryPostRepository: Repository<CategoriesPostEntity>,
  ) {}

  async createCategory(createCategoryDto: CreateCategoryDto): Promise<void> {
    await this.categoryRepository.save(
      await this.categoryRepository.create(createCategoryDto),
    );
  }

  async createCategoryPost(createCategoryPost: CreateCategoryPostDto) {
    for (const id of createCategoryPost.categoryIds) {
      await this.categoryPostRepository.save(
        await this.categoryPostRepository.create({
          caegoryId: id,
          postId: createCategoryPost.postId,
        }),
      );
    }
  }

  async findByCategoryId(
    findPostDto: FindPostDto,
    paginationOptions: IPaginationOptions,
  ): Promise<PostEntity> {
    const categoryIds = findPostDto.categoryIds
      .map((id) => `'${id}'`)
      .join(',');
    const posts = this.categoryRepository.query(`
        SELECT DISTINCT p.*
        FROM post p
        INNER JOIN categories_post pc ON p.id = pc.post_id
        WHERE pc.category_id IN (${categoryIds})
        LIMIT ${paginationOptions.limit}
        OFFSET ${(paginationOptions.page - 1) * paginationOptions.limit}
        `);
    return posts;
  }
}

import { CategoriesEntity } from './entities/category.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {} from 'src/utils/types/pagination-options';
import { Repository } from 'typeorm';
import { CategoriesPostEntity } from './entities/categories-post.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateCategoryPostDto } from './dto/create-categories-post.dto';
import { UpdateCategoryDto } from './dto/update-categories.dto';
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
  async update(
    id: CategoriesEntity['id'],
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<void> {
    const { categoriesPost, ...CategoryDto } = updateCategoryDto;
    await this.categoryRepository.update(id, CategoryDto);
    if (updateCategoryDto.categoriesPost) {
      for (const newCategoryDto of categoriesPost) {
        const { CategoryPostId, ...CategoriesPostDto } = newCategoryDto;
        await this.categoryPostRepository.update(
          CategoryPostId,
          CategoriesPostDto,
        );
      }
    }
  }
}

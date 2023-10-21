import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateCategoryPostDto } from './dto/create-category-post.dto';
import { UpdateCategoryPostDto } from './dto/update-category-post.dto';
import { CategoryPost } from './entities/category-post.entity';

@Injectable()
export class CategoryPostService {
  constructor(
    @InjectRepository(CategoryPost)
    private readonly categoryPostRepository: Repository<CategoryPost>,
  ) {}

  findOne(findOneOptions: FindOneOptions<CategoryPost>) {
    return this.categoryPostRepository.findOne(findOneOptions);
  }

  getAllCategory() {
    return this.categoryPostRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  createCategoryPost(createCategoryPostDto: CreateCategoryPostDto) {
    return this.categoryPostRepository.save(
      this.categoryPostRepository.create(createCategoryPostDto),
    );
  }

  async updateCategoryPost(
    id: number,
    updateCategoryPost: UpdateCategoryPostDto,
  ) {
    const category = await this.findOne({
      where: {
        id,
      },
    });

    if (!category) {
      return new BadRequestException(`Category with ID: ${id} doesn't exists!`);
    }

    return this.categoryPostRepository.save({
      ...category,
      ...updateCategoryPost,
    });
  }

  async deleteCategoryPost(id: number) {
    const category = await this.findOne({
      where: {
        id,
      },
    });

    if (!category) {
      return new BadRequestException(`Category with ID: ${id} doesn't exists!`);
    }

    await this.categoryPostRepository.save(
      this.categoryPostRepository.create({
        ...category,
        post: [],
      }),
    );

    return this.categoryPostRepository.delete(id);
  }
}

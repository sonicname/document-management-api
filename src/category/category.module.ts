import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesEntity } from './entities/category.entity';
import { CategoriesPostEntity } from './entities/categories-post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriesEntity, CategoriesPostEntity])],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}

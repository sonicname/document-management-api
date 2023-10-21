import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryPostController } from './category-post.controller';
import { CategoryPostService } from './category-post.service';
import { CategoryPost } from './entities/category-post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryPost])],
  controllers: [CategoryPostController],
  providers: [CategoryPostService],
  exports: [CategoryPostService],
})
export class CategoryPostModule {}

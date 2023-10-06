import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Patch,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateCategoryPostDto } from './dto/create-categories-post.dto';
import { UpdateCategoryDto } from './dto/update-categories.dto';

@ApiTags('category')
@Controller({
  path: 'category',
  version: '1',
})
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async newCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<void> {
    await this.categoryService.createCategory(createCategoryDto);
  }

  @Post('new')
  @HttpCode(HttpStatus.CREATED)
  async new(
    @Body() createCategoryPostDto: CreateCategoryPostDto,
  ): Promise<void> {
    await this.categoryService.createCategoryPost(createCategoryPostDto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<void> {
    return this.categoryService.update(id, updateCategoryDto);
  }
}

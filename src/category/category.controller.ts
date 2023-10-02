import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateCategoryPostDto } from './dto/create-categories-post.dto';
import { FindPostDto } from './dto/find-post.dto';

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

  @Get('')
  @HttpCode(HttpStatus.OK)
  findAll(
    @Query() findPostDto: FindPostDto,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    if (limit > 50) {
      limit = 50;
    }
    return this.categoryService.findByCategoryId(findPostDto, {
      limit,
      page,
    });
  }
}

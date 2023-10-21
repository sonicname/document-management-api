import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { CategoryPostService } from './category-post.service';
import { CreateCategoryPostDto } from './dto/create-category-post.dto';
import { UpdateCategoryPostDto } from './dto/update-category-post.dto';

@ApiTags('Category')
@Controller({
  path: 'category',
  version: '1',
})
export class CategoryPostController {
  constructor(private readonly categoryPostService: CategoryPostService) {}

  @Get()
  getAllCategoryPost() {
    return this.categoryPostService.getAllCategory();
  }

  @Roles(RoleEnum.admin)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  createCategoryPost(@Body() createCategoryPostDto: CreateCategoryPostDto) {
    return this.categoryPostService.createCategoryPost(createCategoryPostDto);
  }

  @Roles(RoleEnum.admin)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch('/:id')
  updateCategoryPost(
    @Param('id') id: number,
    @Body() updateCategoryPostDto: UpdateCategoryPostDto,
  ) {
    return this.categoryPostService.updateCategoryPost(
      id,
      updateCategoryPostDto,
    );
  }

  @Roles(RoleEnum.admin)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteCategoryPost(@Param('id') id: number) {
    return this.categoryPostService.deleteCategoryPost(id);
  }
}

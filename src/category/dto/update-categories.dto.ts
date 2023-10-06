import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCategoryDto {
  @ApiProperty({
    description: `Category's name`,
    example: `Laptop`,
  })
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @Type(() => UpdateCategoryPostDto)
  categoriesPost: UpdateCategoryPostDto[];
}

export class UpdateCategoryPostDto {
  @IsOptional()
  caegoryId: string;

  @IsOptional()
  postId: string;

  @IsOptional()
  CategoryPostId: string;
}

export class CategoryDto {
  @ApiProperty({
    description: `Category's name`,
    example: `Laptop`,
  })
  @IsOptional()
  @IsString()
  name: string;
}

export class CategoriesPostDto {
  @IsOptional()
  caegoryId: string;

  @IsOptional()
  postId: string;
}

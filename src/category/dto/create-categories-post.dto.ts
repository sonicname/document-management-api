import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
export class CreateCategoryPostDto {
  @ApiProperty({ example: '7f408a6e-15ed-449c-a4fc-4c2386e56797' })
  @IsOptional()
  categoryIds: string[];

  @ApiProperty({ example: '7f408a6e-15ed-449c-a4fc-4c2386e56797' })
  @IsOptional()
  postId: string;
}

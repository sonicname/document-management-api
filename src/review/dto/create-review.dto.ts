import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({ example: 6 })
  @IsOptional()
  user_id: number;

  @ApiProperty({ example: '7f408a6e-15ed-449c-a4fc-4c2386e56797' })
  @IsOptional()
  post_id: string;

  @ApiProperty({ example: 5 })
  @IsOptional()
  rating: number;

  @ApiProperty({ example: 'example description' })
  @IsOptional()
  description: string;
}

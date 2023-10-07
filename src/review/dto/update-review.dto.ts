import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateReviewDto {
  @ApiProperty({ example: 5 })
  @IsOptional()
  rating: number;

  @ApiProperty({ example: 'example description' })
  @IsOptional()
  description: string;
}

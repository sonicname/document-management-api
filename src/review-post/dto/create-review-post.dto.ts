import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, Max, Min } from 'class-validator';

export class CreateReviewPostDto {
  @IsNotEmpty()
  @Length(3, 50)
  @ApiProperty({ example: 'Điền tiều đề của đánh giá bài viết' })
  title: string;

  @IsNotEmpty()
  @Length(5, 255)
  @ApiProperty({ example: 'Điền mô tả của đánh giá bài viết' })
  description: string;

  @IsNotEmpty()
  @Min(0)
  @Max(5)
  @ApiProperty({
    example: 1,
    description: 'Điền đánh giá, thang điểm từ 1 -> 5',
  })
  rating: number;

  @IsNotEmpty()
  @ApiProperty({ example: 'c3c09729-ee86-48c1-bf3f-ca43c94f51e7' })
  postID: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: '7f408a6e-15ed-449c-a4fc-4c2386e56797' })
  @IsOptional()
  file_id: string;

  @ApiProperty({ example: 'example title' })
  @IsOptional()
  title: string;

  @ApiProperty({ example: 'example description' })
  @IsOptional()
  description: string;
}

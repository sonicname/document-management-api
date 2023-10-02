import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class FindPostDto {
  @ApiProperty({
    example: [
      '8bb16a27 - 3456 - 4d1a- b971 - 1f7ca2efb5a5',
      '3e8b14f1 - 7654 - 4962 - 88d7 - 446258c097e9',
    ],
  })
  @IsOptional()
  categoryIds: string[];
}

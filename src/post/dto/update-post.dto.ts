import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdatePostDto {
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @IsOptional()
  id: string;

  @ApiProperty({ example: '7f408a6e-15ed-449c-a4fc-4c2386e56797' })
  @IsOptional()
  file_id: string;

  @ApiProperty({ example: 'updated title' })
  @IsOptional()
  title: string;

  @ApiProperty({ example: 'updated description' })
  @IsOptional()
  description: string;
}

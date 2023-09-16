import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateFileDto {
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @IsOptional()
  id: string;

  @IsOptional()
  path: string;

  @IsOptional()
  uploaderId: number;
}

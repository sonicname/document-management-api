import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
export class CreateCategoryDto {
  @ApiProperty({
    description: `Category's name`,
    example: `Laptop`,
  })
  @IsOptional()
  @IsString()
  name: string;
}

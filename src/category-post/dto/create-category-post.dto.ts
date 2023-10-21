import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCategoryPostDto {
  @ApiProperty({ example: 'Điền thể loại vào đây' })
  @IsNotEmpty()
  name: string;
}

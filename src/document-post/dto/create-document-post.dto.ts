import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, Validate } from 'class-validator';
import { FileEntity } from 'src/files/entities/file.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';

export class CreateDocumentPostDto {
  @ApiProperty({ example: 'Điền tiêu đề vào đây' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Điền mô tả tài liệu vào đấy' })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: () => FileEntity })
  @IsOptional()
  @Validate(IsExist, ['FileEntity', 'id'], {
    message: 'thumbnailNotExists',
  })
  thumbnail: FileEntity | null;

  @ApiProperty({
    example: [1, 2, 3],
    description: 'Điền mảng id của CategoryEntity',
  })
  @IsOptional()
  category: number[];

  @ApiProperty({ type: () => FileEntity })
  @IsOptional()
  @Validate(IsExist, ['FileEntity', 'id'], {
    message: 'fileNotExists',
  })
  file?: FileEntity | null;
}

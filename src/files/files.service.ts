import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { AllConfigType } from 'src/config/config.type';
import { UsersService } from 'src/users/users.service';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { IsNull, Repository } from 'typeorm';
import { UpdateFileDto } from './dto/update-files.dtos';
import { FileEntity } from './entities/file.entity';
import { extname } from 'path';

@Injectable()
export class FilesService {
  constructor(
    private readonly configService: ConfigService<AllConfigType>,
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
    private readonly usersService: UsersService,
  ) {}

  async uploadFile(
    file: Express.Multer.File | Express.MulterS3.File,
    userId: number,
  ): Promise<FileEntity> {
    if (!file) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            file: 'selectFile',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const allowedExtensions = ['.docs', '.pdf', '.docx'];
    const fileExtension = extname(file.originalname).toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            file: 'Invalid file format. Only .docs ,.pdf and .docx are allowed.',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const path = {
      local: `/${this.configService.get('app.apiPrefix', { infer: true })}/v1/${
        file.path
      }`,
      s3: (file as Express.MulterS3.File).location,
    };

    return this.fileRepository.save(
      this.fileRepository.create({
        uploaderId: userId,
        path: path[
          this.configService.getOrThrow('file.driver', { infer: true })
        ],
      }),
    );
  }

  async getFileWithPagination(
    paginationOptions: IPaginationOptions,
    uploaderId: FileEntity['uploaderId'],
  ) {
    return paginate(
      this.fileRepository,
      {
        limit: paginationOptions.limit,
        page: paginationOptions.page,
      },
      {
        where: { deletedAt: IsNull(), uploaderId },
      },
    );
  }

  async getOneById(id: FileEntity['id']): Promise<FileEntity> {
    const file = await this.fileRepository.query(
      `select * from file where id = '${id}' limit 1`,
    );
    return file;
  }

  async update(
    id: FileEntity['id'],
    updateFileDto: UpdateFileDto,
  ): Promise<FileEntity> {
    const updateResult = await this.fileRepository.update(id, updateFileDto);
    if (updateResult.affected === 0) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'Update file.',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const updatedFile = await this.getOneById(id);
    return updatedFile;
  }

  async softDelete(id: FileEntity['id']): Promise<void> {
    await this.fileRepository.softDelete(id);
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { CategoryPostService } from 'src/category-post/category-post.service';
import { CategoryPost } from 'src/category-post/entities/category-post.entity';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  ILike,
  In,
  Repository,
} from 'typeorm';
import { CreateDocumentPostDto } from './dto/create-document-post.dto';
import { UpdateDocumentPostDto } from './dto/update-document-post.dto';
import { DocumentPost } from './entities/document-post.entity';

@Injectable()
export class DocumentPostService {
  constructor(
    @InjectRepository(DocumentPost)
    private readonly documentPostRepository: Repository<DocumentPost>,
    private readonly categoryPostService: CategoryPostService,
  ) {}

  findOne(options: FindOneOptions<DocumentPost>) {
    return this.documentPostRepository.findOne(options);
  }

  pagination(
    paginationOptions: IPaginationOptions,
    findOptions?:
      | FindOptionsWhere<DocumentPost>
      | FindManyOptions<DocumentPost>,
  ) {
    return paginate(
      this.documentPostRepository,
      {
        limit: paginationOptions.limit ?? 50,
        page: paginationOptions.page ?? 1,
      },
      findOptions,
    );
  }

  async createDocumentPost(
    createDocumentPost: CreateDocumentPostDto,
    authorID?: number,
  ) {
    const categories = (
      await Promise.all(
        createDocumentPost.category.map((cate) => {
          return this.categoryPostService.findOne({
            where: {
              id: cate,
            },
          });
        }),
      )
    ).filter((i) => i) as CategoryPost[];

    return this.documentPostRepository.save(
      this.documentPostRepository.create({
        ...createDocumentPost,
        authorID,
        category: categories.length !== 0 ? categories : [],
        reviews: [],
      }),
    );
  }

  async updateDocumentPost(
    postID: string,
    updateDocumentPost: UpdateDocumentPostDto,
    authorID: number,
  ) {
    const documentPost = await this.documentPostRepository.findOne({
      where: {
        id: postID,
        authorID,
      },
    });

    if (!documentPost) {
      return new BadRequestException(
        `Document postID: ${postID} with AuthorID: ${authorID} doesn't exists!`,
      );
    }

    const categories =
      updateDocumentPost.category && updateDocumentPost.category?.length !== 0
        ? ((
            await Promise.all(
              updateDocumentPost.category.map((cate) => {
                return this.categoryPostService.findOne({
                  where: {
                    id: cate,
                  },
                });
              }),
            )
          ).filter((i) => i) as CategoryPost[])
        : [];

    return this.documentPostRepository.save(
      this.documentPostRepository.create({
        ...documentPost,
        ...updateDocumentPost,
        category: categories.length !== 0 ? categories : documentPost.category,
        file: updateDocumentPost.file
          ? {
              ...updateDocumentPost.file,
              id: updateDocumentPost.file.id,
            }
          : documentPost.file,
        thumbnail: updateDocumentPost.thumbnail
          ? {
              ...updateDocumentPost.thumbnail,
              id: updateDocumentPost.thumbnail.id,
            }
          : documentPost.thumbnail,
      }),
    );
  }

  async deleteDocumentPost(id: string, authorID: number) {
    const documentPost = await this.documentPostRepository.findOne({
      where: {
        id,
        authorID,
      },
    });

    if (!documentPost) {
      return new BadRequestException(
        `Document postID: ${id} with AuthorID: ${authorID} doesn't exists!`,
      );
    }

    await this.documentPostRepository.save({
      ...documentPost,
      category: [],
    });

    return this.documentPostRepository.delete(documentPost.id);
  }

  searchDocumentPost(keyword: string, paginationOptions: IPaginationOptions) {
    return this.pagination(paginationOptions, {
      where: {
        title: ILike(`%${keyword.toLocaleLowerCase()}%`),
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findDocumentPostWithCategories(
    categoriesID: number[],
    paginationOptions: IPaginationOptions,
  ) {
    return this.pagination(paginationOptions, {
      where: {
        category: {
          id: In(categoriesID),
        },
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }
}

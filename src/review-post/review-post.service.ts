import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { CreateReviewPostDto } from './dto/create-review-post.dto';
import { UpdateReviewPostDto } from './dto/update-review-post.dto';
import { ReviewPost } from './entities/review-post.entity';

@Injectable()
export class ReviewPostService {
  constructor(
    @InjectRepository(ReviewPost)
    private readonly reviewPostRepository: Repository<ReviewPost>,
  ) {}

  findOne(findOneOptions: FindOneOptions<ReviewPost>) {
    return this.reviewPostRepository.findOne(findOneOptions);
  }

  pagination(
    paginationOptions: IPaginationOptions,
    findOptions?: FindOptionsWhere<ReviewPost> | FindManyOptions<ReviewPost>,
  ) {
    return paginate(
      this.reviewPostRepository,
      {
        limit: paginationOptions.limit ?? 50,
        page: paginationOptions.page ?? 1,
      },
      findOptions,
    );
  }

  async checkIsReviewedInPost(reviewerID: number, postID: string) {
    return this.findOne({
      where: {
        postID,
        reviewerID,
      },
    });
  }

  createReviewPost(reviewerID: number, createReviewPost: CreateReviewPostDto) {
    return this.reviewPostRepository.save(
      this.reviewPostRepository.create({
        ...createReviewPost,
        reviewerID,
      }),
    );
  }

  async updateReviewPost(
    reviewID: number,
    updateReviewPost: UpdateReviewPostDto,
    reviewerID: number,
  ) {
    const reviewPost = await this.findOne({
      where: {
        id: reviewID,
        reviewerID,
      },
    });

    if (!reviewPost) {
      return new BadRequestException(
        `Review post: ${reviewID} with reviewerID: ${reviewID} doesn't exists!`,
      );
    }

    return this.reviewPostRepository.save(
      this.reviewPostRepository.create({
        ...reviewPost,
        ...updateReviewPost,
      }),
    );
  }

  async deleteReviewPost(reviewID: number, reviewerID: number) {
    const reviewPost = this.findOne({
      where: {
        id: reviewID,
        reviewerID: reviewerID,
      },
    });

    if (!reviewPost) {
      return new BadRequestException(
        `Review with ID: ${reviewID} & reviewerID: ${reviewerID} doesn't exists!`,
      );
    }

    return this.reviewPostRepository.delete(reviewID);
  }
}

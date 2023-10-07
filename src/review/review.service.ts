import { Injectable } from '@nestjs/common';
import { ReviewEntity } from './review.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PostService } from 'src/post/post.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>,
    private readonly postService: PostService,
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<void> {
    await this.reviewRepository.save(
      await this.reviewRepository.create(createReviewDto),
    );
    await this.postService.updateTotalReview(
      createReviewDto.post_id,
      createReviewDto.rating,
    );
  }

  async getRateAverage(postId: ReviewEntity['postId']): Promise<number> {
    const reviewAverage = await this.reviewRepository.query(`
      SELECT p.total_review / subquery.total
      FROM post p
      JOIN (  
          SELECT COUNT(*) AS total, r.postId
          FROM review r
          WHERE r.post_id = '${postId}'
          GROUP BY r.post_id
      ) AS subquery
      ON p.id = subquery.post_id;                  
    `);
    return reviewAverage;
  }

  async getAll(
    postId: ReviewEntity['postId'],
    paginationOptions: IPaginationOptions,
  ): Promise<ReviewEntity[]> {
    const reviews = this.reviewRepository.query(`
        select *
        from review
        where post_id = '${postId}'
        and "deletedAt" isnull 
        limit ${paginationOptions.limit}
        offset ${(paginationOptions.page - 1) * paginationOptions.limit};
    `);
    return reviews;
  }

  async update(
    id: ReviewEntity['id'],
    updateReviewDto: UpdateReviewDto,
  ): Promise<void> {
    await this.reviewRepository.update(id, updateReviewDto);
  }

  async delete(id: ReviewEntity['id']): Promise<void> {
    await this.reviewRepository.softDelete(id);
  }
}

import { PartialType } from '@nestjs/swagger';
import { CreateReviewPostDto } from './create-review-post.dto';

export class UpdateReviewPostDto extends PartialType(CreateReviewPostDto) {}

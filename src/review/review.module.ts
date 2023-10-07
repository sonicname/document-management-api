import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { ReviewEntity } from './review.entity';
import { PostModule } from 'src/post/post.module';
@Module({
  imports: [TypeOrmModule.forFeature([ReviewEntity]), PostModule],
  providers: [ReviewService],
  controllers: [ReviewController],
})
export class ReviewModule {}

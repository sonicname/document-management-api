import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewPost } from './entities/review-post.entity';
import { ReviewPostController } from './review-post.controller';
import { ReviewPostService } from './review-post.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewPost])],
  controllers: [ReviewPostController],
  providers: [ReviewPostService],
})
export class ReviewPostModule {}

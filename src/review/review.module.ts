import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { ReviewEntity } from './review.entity';
@Module({
  imports: [TypeOrmModule.forFeature([ReviewEntity])],
  providers: [ReviewService],
  controllers: [ReviewController],
})
export class ReviewModule {}

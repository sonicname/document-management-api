import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewEntity } from './review.entity';

@ApiTags('review')
@Controller({
  path: 'review',
  version: '1',
})
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async newCategory(@Body() createReviewDto: CreateReviewDto): Promise<void> {
    await this.reviewService.create(createReviewDto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findAll(
    @Param('id') id: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<ReviewEntity[]> {
    if (limit > 50) {
      limit = 50;
    }
    return this.reviewService.getAll(id, {
      limit,
      page,
    });
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ): Promise<void> {
    return this.reviewService.update(id, updateReviewDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.reviewService.delete(id);
  }
}

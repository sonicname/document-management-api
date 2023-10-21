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
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateReviewPostDto } from './dto/create-review-post.dto';
import { UpdateReviewPostDto } from './dto/update-review-post.dto';
import { ReviewPostService } from './review-post.service';

@ApiTags('Review Post')
@Controller({
  path: 'review-post',
  version: '1',
})
export class ReviewPostController {
  constructor(private readonly reviewPostService: ReviewPostService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  createReviewPost(
    @Body() createReviewPost: CreateReviewPostDto,
    @Req() request,
  ) {
    return this.reviewPostService.createReviewPost(
      request?.user?.id,
      createReviewPost,
    );
  }

  @Get('/post/:id')
  getAllReviewPostByPostID(
    @Param('id') id: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.reviewPostService.pagination(
      {
        page,
        limit,
      },
      {
        where: {
          post: {
            id,
          },
        },
        order: {
          createdAt: 'DESC',
        },
      },
    );
  }

  @Get(':id')
  getReviewPostByID(@Param('id') id: number) {
    return this.reviewPostService.findOne({
      where: {
        id,
      },
    });
  }

  @Get('reviewer/:reviewerID/post/:postID')
  getReviewByReviewerIDAndPostID(
    @Param('reviewerID') reviewerID: number,
    @Param('postID') postID: string,
  ) {
    return this.reviewPostService.checkIsReviewedInPost(reviewerID, postID);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  updateReviewPost(
    @Param('id') id: number,
    @Body() updateReviewPostDto: UpdateReviewPostDto,
    @Req() request,
  ) {
    return this.reviewPostService.updateReviewPost(
      id,
      updateReviewPostDto,
      request?.user?.id,
    );
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteReviewPost(@Param('id') id: number, @Req() request) {
    return this.reviewPostService.deleteReviewPost(id, request?.user?.id);
  }
}

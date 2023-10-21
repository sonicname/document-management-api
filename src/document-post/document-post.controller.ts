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
import { DocumentPostService } from './document-post.service';
import { CreateDocumentPostDto } from './dto/create-document-post.dto';
import { UpdateDocumentPostDto } from './dto/update-document-post.dto';

@ApiTags('Document Post')
@Controller({
  path: 'document-post',
  version: '1',
})
export class DocumentPostController {
  constructor(private readonly documentPostService: DocumentPostService) {}

  @Get()
  getAllDocumentPosts(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.documentPostService.pagination(
      {
        limit,
        page,
      },
      {
        order: {
          createdAt: 'DESC',
        },
      },
    );
  }

  @Get('/me')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getAllMyPosts(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Req() request,
  ) {
    return this.documentPostService.pagination(
      {
        limit,
        page,
      },
      {
        where: {
          authorID: request?.user?.id,
        },
        order: {
          createdAt: 'DESC',
        },
      },
    );
  }

  @Get('/categories')
  getDocumentPostWithCategories(
    @Query('categories') categories: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.documentPostService.findDocumentPostWithCategories(
      categories.split(',').map((i) => Number(i)),
      {
        limit,
        page,
      },
    );
  }

  @Get('/search')
  getDocumentPostWithKeyword(
    @Query('q') q: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.documentPostService.searchDocumentPost(q, {
      limit,
      page,
    });
  }

  @Get(':id')
  getDocumentPostByID(@Param('id') id: string) {
    return this.documentPostService.findOne({
      where: {
        id,
      },
    });
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  createDocumentPost(
    @Req() request,
    @Body() createDocumentPostDto: CreateDocumentPostDto,
  ) {
    return this.documentPostService.createDocumentPost(
      createDocumentPostDto,
      request?.user?.id,
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  updateDocumentPost(
    @Req() request,
    @Param('id') id: string,
    @Body() updateDocumentPostDto: UpdateDocumentPostDto,
  ) {
    return this.documentPostService.updateDocumentPost(
      id,
      updateDocumentPostDto,
      request?.user?.id,
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteDocumentPost(@Req() request, @Param('id') id: string) {
    return this.documentPostService.deleteDocumentPost(id, request?.user?.id);
  }
}

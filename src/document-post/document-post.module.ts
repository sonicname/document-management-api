import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryPostModule } from 'src/category-post/category-post.module';
import { FilesModule } from 'src/files/files.module';
import { DocumentPostController } from './document-post.controller';
import { DocumentPostService } from './document-post.service';
import { DocumentPost } from './entities/document-post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DocumentPost]),
    FilesModule,
    CategoryPostModule,
  ],
  controllers: [DocumentPostController],
  providers: [DocumentPostService],
})
export class DocumentPostModule {}

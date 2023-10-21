import { PartialType } from '@nestjs/swagger';
import { CreateDocumentPostDto } from './create-document-post.dto';

export class UpdateDocumentPostDto extends PartialType(CreateDocumentPostDto) {}

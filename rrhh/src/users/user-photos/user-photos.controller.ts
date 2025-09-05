import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AzureBlobService } from './azure-blob.service';
import * as multer from 'multer';

@Controller('user-photos')
export class UserPhotosController {
  constructor(private readonly azureBlobService: AzureBlobService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { storage: multer.memoryStorage() }))
  async uploadPhoto(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return { message: 'No se subió ningúna imagen' };
    }

    const url = await this.azureBlobService.uploadFile(file);
    return { message: 'Imagen subida exitosamente', url };
  }
}

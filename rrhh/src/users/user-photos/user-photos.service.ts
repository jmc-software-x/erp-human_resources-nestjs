import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AzureBlobService } from './azure-blob.service';
import * as multer from 'multer';
import type { Express } from 'express';  

@Controller('user-photos')
export class UserPhotosController {
  constructor(private readonly azureBlobService: AzureBlobService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { storage: multer.memoryStorage() }))
  async uploadPhoto(@UploadedFile() file: Express.Multer.File) {
    if (!file) return { message: 'No se subió ningún archivo' };

    const url = await this.azureBlobService.uploadFile(file);
    return { message: 'Archivo subido exitosamente', url };
  }
}

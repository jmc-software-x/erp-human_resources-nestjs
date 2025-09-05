import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BlobServiceClient } from '@azure/storage-blob';
import { v4 as uuid } from 'uuid';
import * as path from 'path';

@Injectable()
export class AzureBlobService {
  private blobServiceClient: BlobServiceClient;
  private containerName: string;

  constructor(private configService: ConfigService) {
    const connectionString = this.configService.get<string>(
      'AZURE_STORAGE_CONNECTION_STRING',
    )!;
    this.containerName = this.configService.get<string>(
      'AZURE_STORAGE_CONTAINER_NAME',
    )!;

    this.blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    if (!file || !file.buffer) {
      throw new Error('No se recibió ningún archivo para subir.');
    }

    const containerClient = this.blobServiceClient.getContainerClient(this.containerName);

    const blobName = uuid() + path.extname(file.originalname);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
   
    await blockBlobClient.uploadData(file.buffer, {
      blobHTTPHeaders: { blobContentType: file.mimetype },
    });

    
    return blockBlobClient.url;
  }
}

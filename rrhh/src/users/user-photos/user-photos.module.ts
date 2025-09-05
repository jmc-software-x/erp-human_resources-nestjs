import { Module } from '@nestjs/common';
import { UserPhotosController } from './user-photos.controller';
import { AzureBlobService } from './azure-blob.service';
import { config } from 'process';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [UserPhotosController],
  providers: [AzureBlobService],
  
})
export class UserPhotosModule {}

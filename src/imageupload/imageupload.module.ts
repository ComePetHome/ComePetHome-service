import { Module } from '@nestjs/common';
import { ImageuploadService } from './imageupload.service';
import { ImageuploadController } from './imageupload.controller';

@Module({
  providers: [ImageuploadService],
  controllers: [ImageuploadController],
  exports: [ImageuploadService],
})
export class ImageuploadModule {}

import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ImageuploadService } from './imageupload.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('이미지 업로드')
@Controller('imageupload')
export class ImageuploadController {
  constructor(private readonly imageUploadService: ImageuploadService) {}

  @Post()
  @ApiOperation({ summary: '이미지 업로드하기' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files', 3))
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Images uploaded successfully' })
  async uploadFile(@UploadedFiles() files: Express.Multer.File[]) {
    const imgurl: string[] = [];
    await Promise.all(
      files.map(async (file: Express.Multer.File) => {
        const key = await this.imageUploadService.fileUpload(file);
        imgurl.push(key);
      }),
    );
    return {
      statusCode: 201,
      message: `이미지 등록 성공`,
      data: imgurl,
    };
  }
}

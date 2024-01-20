import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

@Injectable()
export class ImageuploadService {
  private readonly s3;

  constructor() {
    AWS.config.update({
      region: 'ap-northeast-2',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    });

    this.s3 = new AWS.S3();
  }

  async fileUpload(file: Express.Multer.File): Promise<string> {
    if (file == undefined) {
      return null;
    } else {
      const key = `${Date.now() + file.originalname}`;
      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        ACL: 'private',
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        ContentDisposition: 'inline',
      };

      return new Promise((resolve, reject) => {
        this.s3.putObject(params, (err, data) => {
          if (err) reject(err);
          resolve(key);
        });
      });
    }
  }

  async fileDelete(fileName: string): Promise<void> {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileName,
    };

    return new Promise((resolve, reject) => {
      this.s3.deleteObject(params, (err, data) => {
        if (err) reject(err);
        resolve();
      });
    });
  }
}

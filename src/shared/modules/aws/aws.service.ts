import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { config } from '../../../config';
import { extname } from 'path';

AWS.config.update({
  accessKeyId: config.aws.ACCESS_KEY_ID,
  secretAccessKey: config.aws.SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

@Injectable()
export class AwsService {
  async fileUpload(file: any, folderName: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const name = file.originalname.split('.')[0];
      const fileExtName = extname(file.originalname);
      const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString())
        .join('');
      const params: AWS.S3.Types.PutObjectRequest = {
        Bucket: 'music-land-upload',
        Key: `${folderName}/${name}-${randomName}${fileExtName}`,
        Body: file.buffer,
        ACL: 'public-read',
      };
      s3.upload(params, (err, data: AWS.S3.ManagedUpload.SendData) => {
        if (err) {
          return reject(err);
        }
        resolve(`${config.aws.cdnUrl}/${data.Key}`);
      });
    });
  }

  async fileDelete(fileName: string, length: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const params: AWS.S3.DeleteObjectRequest = {
        Bucket: 'music-land-upload',
        Key: fileName.substring(length),
      };
      s3.deleteObject(params, (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  }
}

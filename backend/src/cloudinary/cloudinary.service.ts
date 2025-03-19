import { Injectable } from "@nestjs/common";
import { Express } from "express";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

@Injectable()
export class CloudinaryService {
  async uploadVideo(file: Express.Multer.File) {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "video", folder: "course-videos" },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result?.secure_url ?? result?.url);
          }
        }
      );

      const readableStream = new Readable();
      readableStream.push(file.buffer);
      readableStream.push(null);
      readableStream.pipe(uploadStream);
    });
  }
}

import { Express } from "express";
export declare class UploadController {
    upload(file: Express.Multer.File): {
        url: string;
    };
}

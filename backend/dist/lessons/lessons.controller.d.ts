import { LessonsService } from "./lessons.service";
import { CreateLessonDto } from "./dto/create-lesson.dto";
import { UpdateLessonDto } from "./dto/update-lesson.dto";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
export declare class LessonsController {
    private readonly lessonsService;
    private readonly cloudinaryService;
    constructor(lessonsService: LessonsService, cloudinaryService: CloudinaryService);
    findAll(): Promise<({
        lessons: {
            id: number;
            title: string;
            content: string;
            videoUrl: string;
            courseId: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        id: number;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        instructor: string;
        price: number;
        userId: number;
    })[]>;
    findOne(id: string): Promise<{
        id: number;
        title: string;
        content: string;
        videoUrl: string;
        courseId: number;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    update(id: string, updateLessonDto: UpdateLessonDto): Promise<{
        id: number;
        title: string;
        content: string;
        videoUrl: string;
        courseId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: number;
        title: string;
        content: string;
        videoUrl: string;
        courseId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    uploadVideo(file: any, courseId: number, createLessonDto: CreateLessonDto): Promise<{
        id: number;
        title: string;
        content: string;
        videoUrl: string;
        courseId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}

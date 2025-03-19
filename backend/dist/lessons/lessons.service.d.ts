import { UpdateLessonDto } from "./dto/update-lesson.dto";
import { PrismaService } from "src/prisma.service";
export declare class LessonsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createLessonDto: any): Promise<{
        id: number;
        title: string;
        content: string;
        videoUrl: string;
        courseId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
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
    findOne(id: number): Promise<{
        id: number;
        title: string;
        content: string;
        videoUrl: string;
        courseId: number;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    update(id: number, updateLessonDto: UpdateLessonDto): Promise<{
        id: number;
        title: string;
        content: string;
        videoUrl: string;
        courseId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        title: string;
        content: string;
        videoUrl: string;
        courseId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}

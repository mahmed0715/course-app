import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { PrismaService } from "src/prisma.service";
export declare class CoursesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createCourseDto: CreateCourseDto, user: any): Promise<{
        id: number;
        title: string;
        description: string;
        instructor: string;
        price: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
    }>;
    findAll(): Promise<({
        lessons: {
            id: number;
            title: string;
            createdAt: Date;
            updatedAt: Date;
            content: string;
            videoUrl: string;
            courseId: number;
        }[];
    } & {
        id: number;
        title: string;
        description: string;
        instructor: string;
        price: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
    })[]>;
    findOne(id: number): Promise<({
        lessons: {
            id: number;
            title: string;
            createdAt: Date;
            updatedAt: Date;
            content: string;
            videoUrl: string;
            courseId: number;
        }[];
    } & {
        id: number;
        title: string;
        description: string;
        instructor: string;
        price: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
    }) | null>;
    update(id: number, updateCourseDto: UpdateCourseDto): Promise<{
        id: number;
        title: string;
        description: string;
        instructor: string;
        price: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        title: string;
        description: string;
        instructor: string;
        price: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
    }>;
}

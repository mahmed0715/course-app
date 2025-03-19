import { CoursesService } from "./courses.service";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
export declare class CoursesController {
    private readonly coursesService;
    constructor(coursesService: CoursesService);
    create(createCourseDto: CreateCourseDto, req: any): Promise<{
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
    findOne(id: string): Promise<({
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
    update(id: string, updateCourseDto: UpdateCourseDto): Promise<{
        id: number;
        title: string;
        description: string;
        instructor: string;
        price: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
    }>;
    remove(id: string): Promise<{
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

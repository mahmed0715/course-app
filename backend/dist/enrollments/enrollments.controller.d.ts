import { EnrollmentsService } from "./enrollments.service";
import { CreateEnrollmentDto } from "./dto/create-enrollment.dto";
export declare class EnrollmentsController {
    private readonly enrollmentsService;
    constructor(enrollmentsService: EnrollmentsService);
    create(createEnrollmentDto: CreateEnrollmentDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        courseId: number;
    }>;
    findAll(): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        courseId: number;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        courseId: number;
    } | null>;
    remove(id: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        courseId: number;
    }>;
}

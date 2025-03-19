import { CreateEnrollmentDto } from "./dto/create-enrollment.dto";
import { PrismaService } from "src/prisma.service";
export declare class EnrollmentsService {
    private prisma;
    constructor(prisma: PrismaService);
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
    findOne(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        courseId: number;
    } | null>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        courseId: number;
    }>;
}

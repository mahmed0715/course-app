import { User, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.UserCreateInput): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findOne(id: number): Promise<User | null>;
}

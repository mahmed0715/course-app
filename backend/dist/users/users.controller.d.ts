import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    register(createUserDto: CreateUserDto): Promise<{
        id: number;
        email: string;
        password: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findOne(id: string): Promise<{
        id: number;
        email: string;
        password: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
}

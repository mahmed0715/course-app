import { BadRequestException, Injectable } from "@nestjs/common";
import { User, Prisma } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { EmailService } from "src/common/services/email.notification.service";
import { PrismaService } from "src/prisma.service";
import * as uuid from "uuid";
@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private mailerService: EmailService
  ) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: data.email, // Check if user with this email already exists
      },
    });

    if (existingUser) {
      throw new BadRequestException("Email already in use"); // or handle this case as needed
    }
    data.password = bcrypt.hashSync(data.password, 10);
    const user = await this.prisma.user.create({ data });
    await this.mailerService.sendVerificationEmail(data.email, uuid.v4());
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findOne(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }
}

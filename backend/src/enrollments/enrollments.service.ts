import { Injectable } from "@nestjs/common";
import { CreateEnrollmentDto } from "./dto/create-enrollment.dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  async create(createEnrollmentDto: CreateEnrollmentDto) {
    return this.prisma.enrollment.create({ data: createEnrollmentDto });
  }

  async findAll() {
    return this.prisma.enrollment.findMany();
  }

  async findOne(id: number) {
    return this.prisma.enrollment.findUnique({ where: { id } });
  }

  async remove(id: number) {
    return this.prisma.enrollment.delete({ where: { id } });
  }
}

import { Injectable } from "@nestjs/common";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async create(createCourseDto: CreateCourseDto, user) {
    return this.prisma.course.create({
      data: {
        ...createCourseDto,
        price: Number(createCourseDto.price),
        userId: user.id,
      },
    });
  }

  async findAll() {
    return this.prisma.course.findMany({
      include: {
        lessons: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.course.findUnique({
      where: { id },
      include: {
        lessons: true,
      },
    });
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    return this.prisma.course.update({
      where: { id },
      data: updateCourseDto,
    });
  }

  async remove(id: number) {
    await this.prisma.lesson.deleteMany({
      where: {
        courseId: id,
      },
    });
    return this.prisma.course.delete({ where: { id } });
  }
}

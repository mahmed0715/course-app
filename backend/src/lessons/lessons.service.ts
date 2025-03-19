import { Injectable } from "@nestjs/common";
import { CreateLessonDto } from "./dto/create-lesson.dto";
import { UpdateLessonDto } from "./dto/update-lesson.dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class LessonsService {
  constructor(private prisma: PrismaService) {}

  async create(createLessonDto) {
    return this.prisma.lesson.create({
      data: { ...createLessonDto, courseId: Number(createLessonDto.courseId) },
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
    return this.prisma.lesson.findUnique({ where: { id } });
  }

  async update(id: number, updateLessonDto: UpdateLessonDto) {
    return this.prisma.lesson.update({
      where: { id },
      data: updateLessonDto,
    });
  }

  async remove(id: number) {
    return this.prisma.lesson.delete({ where: { id } });
  }
}

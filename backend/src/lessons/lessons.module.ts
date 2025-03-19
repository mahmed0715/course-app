import { Module } from "@nestjs/common";
import { LessonsService } from "./lessons.service";
import { LessonsController } from "./lessons.controller";
import { PrismaService } from "src/prisma.service";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";

@Module({
  controllers: [LessonsController],
  providers: [LessonsService, PrismaService, CloudinaryService],
})
export class LessonsModule {}

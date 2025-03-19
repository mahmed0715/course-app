import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { UploadModule } from "./upload/upload.module";
import { UsersModule } from "./users/users.module";
import { CoursesModule } from "./courses/courses.module";
import { LessonsModule } from "./lessons/lessons.module";
import { EnrollmentsModule } from "./enrollments/enrollments.module";
import { PrismaService } from "./prisma.service";
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    AuthModule,
    UploadModule,
    UsersModule,
    CoursesModule,
    LessonsModule,
    EnrollmentsModule,
    CloudinaryModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}

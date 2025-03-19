import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { UploadModule } from "./upload/upload.module";
import { UsersModule } from "./users/users.module";
import { CoursesModule } from "./courses/courses.module";
import { LessonsModule } from "./lessons/lessons.module";
import { EnrollmentsModule } from "./enrollments/enrollments.module";
import { PrismaService } from "./prisma.service";
import { CloudinaryModule } from "./cloudinary/cloudinary.module";
import { MailerModule } from "@nestjs-modules/mailer";
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: Boolean(process.env.EMAIL_SECURE),
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
          minVersion: "TLSv1.2",
        },
      },
    }),
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

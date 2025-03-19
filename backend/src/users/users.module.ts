import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { PrismaService } from "src/prisma.service";
import { EmailService } from "src/common/services/email.notification.service";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [ConfigModule],
  providers: [UsersService, PrismaService, ConfigService, EmailService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}

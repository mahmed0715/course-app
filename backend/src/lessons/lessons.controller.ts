import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
} from "@nestjs/common";
import { LessonsService } from "./lessons.service";
import { CreateLessonDto } from "./dto/create-lesson.dto";
import { UpdateLessonDto } from "./dto/update-lesson.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
@Controller("lessons")
export class LessonsController {
  constructor(
    private readonly lessonsService: LessonsService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  // @Post()
  // create(@Body() createLessonDto: CreateLessonDto) {
  //   return this.lessonsService.create(createLessonDto);
  // }

  @Get()
  findAll() {
    return this.lessonsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.lessonsService.findOne(+id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonsService.update(+id, updateLessonDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.lessonsService.remove(+id);
  }

  @Post("/upload-video")
  @UseInterceptors(FileInterceptor("video"))
  async uploadVideo(
    @UploadedFile() file: any,
    @Body() createLessonDto: CreateLessonDto
  ) {
    console.log(file);
    const videoUrl = await this.cloudinaryService.uploadVideo(file);
    console.log("video uploaded!!");
    return this.lessonsService.create({ ...createLessonDto, videoUrl });
  }
}

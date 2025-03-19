import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateLessonDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @IsString()
  @ApiProperty()
  content: string;

  // @IsString()
  // @ApiProperty()
  // videoUrl: string;

  @IsNumber()
  @ApiProperty()
  courseId: number;
}
